"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="admin-header">
      <Link href="/admin" className="brand">
        <span className="brand-mark">+</span>
        <span>
          RedLine <span style={{ color: "var(--red)" }}>Dispatch</span>
        </span>
      </Link>
      <button className="btn btn-quiet" onClick={logout}>
        Sign out
      </button>
    </header>
  );
}
