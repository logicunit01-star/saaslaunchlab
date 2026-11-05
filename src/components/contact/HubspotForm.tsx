"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { ContactForm } from "./ContactForm";

interface HubspotFormProps {
  portalId?: string;
  formId?: string;
  region?: string;
}

export function HubspotForm({
  portalId = "246175508",
  formId = "115db458-7775-41e5-9827-269d275ebf11",
  region = "na2"
}: HubspotFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    // Check if script already exists
    const scriptId = "hubspot-form-v2-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initForm = () => {
      if (typeof window !== "undefined" && (window as any).hbspt) {
        // Clear container before rendering
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        try {
          (window as any).hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#hubspot-form-container-${formId}`,
            onFormReady: () => {
              if (isMounted) setIsLoading(false);
            },
            onFormSubmitted: () => {
              if (isMounted) setIsLoading(false);
            }
          });
        } catch (e) {
          console.warn("HubSpot form initialization failed:", e);
          if (isMounted) {
            setIsLoading(false);
            setIsBlocked(true);
          }
        }
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://js-${region}.hsforms.net/forms/embed/v2.js`;
      script.async = true;
      script.charset = "utf-8";

      script.onload = () => {
        initForm();
      };

      script.onerror = () => {
        console.warn("HubSpot embed script could not be loaded (likely blocked by client). Falling back to direct API form.");
        if (isMounted) {
          setIsLoading(false);
          setIsBlocked(true);
        }
      };

      document.body.appendChild(script);
    } else {
      if ((window as any).hbspt) {
        initForm();
      } else {
        script.addEventListener("load", initForm);
      }
    }

    // Safety timeout: if HubSpot doesn't load within 4 seconds (e.g. adblocker)
    const timer = setTimeout(() => {
      if (isMounted && isLoading) {
        const container = document.getElementById(`hubspot-form-container-${formId}`);
        if (!container || !container.hasChildNodes()) {
          setIsBlocked(true);
          setIsLoading(false);
        }
      }
    }, 3500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [portalId, formId, region]);

  if (isBlocked) {
    // Graceful fallback to our API contact form
    return <ContactForm />;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs min-h-[420px] relative">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-sky-600" />
          <p className="text-sm font-medium">Loading form...</p>
        </div>
      )}
      <div
        id={`hubspot-form-container-${formId}`}
        ref={containerRef}
        className={isLoading ? "hidden" : "hubspot-form-wrapper"}
      />
    </div>
  );
}
