import { serviceClientWall } from "@/content/clients";
import { ClientLogoWall } from "@/components/ui/ClientLogoWall";

/** "Brands that trust our work" on every service page — see {@link ClientLogoWall}. */
export default function Clients() {
    return (
        <ClientLogoWall
            eyebrow={serviceClientWall.eyebrow}
            titleLead={serviceClientWall.titleLead}
            titleAccent={serviceClientWall.titleAccent}
            stat={serviceClientWall.stat}
        />
    );
}
