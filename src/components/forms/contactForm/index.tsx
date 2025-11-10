"use client";
import Button from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "emailjs-com";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../input";
import { CONTACT_FORM_EMAIL_PUBLIC_KEY, CONTACT_FORM_EMAIL_SERVICE_ID, CONTACT_FORM_EMAIL_TEMPLATE_ID } from "./constants";
import { FormData, initialFormData } from "./form";
import { contactFormSchema } from "./schema";


export default function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: initialFormData,
    resolver: yupResolver(contactFormSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await emailjs.send(
        CONTACT_FORM_EMAIL_SERVICE_ID,
        CONTACT_FORM_EMAIL_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        CONTACT_FORM_EMAIL_PUBLIC_KEY
      );
      reset();
      toast.success("Message sent successfully!", {
        duration: 5000,
        style: { padding: "1.5rem", backgroundColor: "#e6f7ed", color: "#0a0f29", fontWeight: "bold" }
      });
    } catch {
      toast.error("Failed to send message. Please try again later.", {
        duration: 5000,
        style: { padding: "1.5rem", backgroundColor: "#faece7", color: "#0a0f29", fontWeight: "bold" }
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 border border-solid rounded-xl border-platinum bg-white w-full max-w-lg">

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="Email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Input
            label="Subject"
            placeholder="What do you want to talk about?"
            error={errors.subject?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Input
            label="Message"
            placeholder="Type your message here"
            as="textarea"
            error={errors.message?.message}
            {...field}
          />
        )}
      />
      <Button type="submit" style="primary" fullWidth loading={loading}>
          Send Message
      </Button>
    </form>
  );
}