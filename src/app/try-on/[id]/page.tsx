import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import TryOnUploadView from "./TryOnUploadView";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  return { title: p ? `Try On · ${p.name} · TBZ` : "Try On · TBZ" };
}

export default async function TryOnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((x) => x.id === id);
  if (!product) notFound();

  return <TryOnUploadView product={product} />;
}
