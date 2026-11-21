import { IconeWhatsApp } from "./IconeWhatsApp";
import { contact } from "@/configuration/contact";

export function BoutonWhatsAppFlottant() {
  return (
    <a
      href={contact.whatsapp.lienContact}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      aria-label="Contacter sur WhatsApp"
    >
      <IconeWhatsApp className="w-8 h-8" />
    </a>
  );
}