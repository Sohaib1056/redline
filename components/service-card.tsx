import Link from "next/link";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <div className="service-icon">{service.shortIcon}</div>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <Link className="text-link" href={`/services/${service.slug}`}>
        View service details <span className="arrow">→</span>
      </Link>
    </article>
  );
}
