/**
 * Renders structured data as a plain <script type="application/ld+json">.
 *
 * Deliberately NOT next/script: that component is built for loading and
 * executing JavaScript, and JSON-LD is data, not code. The Next.js docs call
 * out a native <script> tag as the correct choice here.
 *
 * The `<` escape is required — JSON.stringify does not sanitise strings, so a
 * `</script>` inside any content value would break out of the tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
