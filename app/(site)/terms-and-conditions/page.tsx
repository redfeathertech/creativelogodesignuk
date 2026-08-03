import LegalPage, { legalMetadata } from "@/components/legal/LegalPage";

const PATH = "/terms-and-conditions";

export const metadata = legalMetadata(PATH);

export default function Page() {
    return <LegalPage path={PATH} />;
}
