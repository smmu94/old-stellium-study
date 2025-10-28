"use client";
import { useNavigate } from "@/hooks/useNavigate";
import Button from "@/components/ui/button";
import { ROUTES } from "@/utils/routes/routes";

export default function SignUpButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(ROUTES.AUTH)}>Sign Up</Button>
  );
}
