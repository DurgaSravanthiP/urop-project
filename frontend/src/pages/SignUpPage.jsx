import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthFormField from "../components/AuthFormField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { formatName } from "../utils/formatName";

export default function SignUpPage() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(formatName(name), email, password, {
        hospital: organization,
        specialization,
        doctorId,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register to save your profile and use the diagnosis workflow."
    >
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="auth-grid">
          <AuthFormField
            label="Full name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <AuthFormField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <AuthFormField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            showPasswordToggle
          />
          <AuthFormField
            label="Hospital / Organization"
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
          <AuthFormField
            label="Medical specialization"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <AuthFormField
            label="Doctor ID"
            id="doctor-id"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required={false}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="primary-btn w-full"
          disabled={submitting}
        >
          {submitting ? "Creating account…" : "Sign up"}
        </Button>
      </form>

      <p className="signup-footer text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-teal-700 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
