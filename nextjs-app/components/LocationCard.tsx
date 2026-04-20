import {
  type Location,
  googleMapsLink,
  googleMapsEmbed,
  locationAddress,
} from "@/lib/locations";

type Props = {
  location: Location;
};

export default function LocationCard({ location }: Props) {
  return (
    <article className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
      <div className="relative aspect-[16/10] bg-gray-100">
        <iframe
          title={`Map of ${location.name}`}
          src={googleMapsEmbed(location)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-extrabold text-gray-900">
            {location.name}
          </h3>
          {location.is_paramus ? (
            <span className="shrink-0 inline-flex items-center gap-1 bg-brand-light text-brand text-xs font-bold px-2 py-1 rounded-full">
              ★ #1 in Paramus 2025
            </span>
          ) : null}
        </div>
        <address className="not-italic text-gray-600 text-sm mt-2 leading-relaxed">
          {location.street}
          <br />
          {location.city}, {location.state} {location.zip}
        </address>
        <div className="mt-auto pt-5">
          <a
            href={googleMapsLink(location)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
            aria-label={`Get directions to ${location.name}`}
          >
            Get Directions
            <span aria-hidden>→</span>
          </a>
        </div>
        <p className="sr-only">{locationAddress(location)}</p>
      </div>
    </article>
  );
}
