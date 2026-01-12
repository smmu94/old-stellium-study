import ContactForm from "@/components/forms/contactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center px-4 gap-16">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center">
        <h1 className="text-preset-1 text-oxford">
            Contact and Support
        </h1>
        <p className="text-preset-3 text-oxford">
            Do you have any questions, suggestions, or technical issues? We&apos;re here to help! Fill out the form and we&apos;ll get back to you as soon as possible.    
        </p>
      </div>
      <ContactForm />
    </div>
  );
}