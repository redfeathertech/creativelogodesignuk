import { clientWall } from "@/content/about";
import { ClientLogoWall } from "@/components/ui/ClientLogoWall";

/** "Brands that trust our work" on About Us — see {@link ClientLogoWall}. */
export default function Clients() {
    return (
        <ClientLogoWall
            eyebrow={clientWall.eyebrow}
            titleLead={clientWall.titleLead}
            titleAccent={clientWall.titleAccent}
            lead={clientWall.lead}
            stat={clientWall.stat}
        />
    );
}
