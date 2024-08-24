import { LanguageSwitcher } from '@/components/language-switcher';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex min-h-screen items-start p-24">
            <LanguageSwitcher />
            <div>
                {`The Global Freedom Scholars Network (GFS) is a transnational network for justice-impacted students. The GFS supports, instigates and advocates for the advancement of educational opportunities and post-release support for incarcerated students across the globe.
The GFS views
access to higher education as a fundamental right for all and sees higher education in prisons not as a special circumstance but as a global norm.
The GFS advocates
for advancing educational opportunities in prisons worldwide and works with relevant stakeholders to ensure educational opportunities for those in prison.
The GFS recognises
the gaps and discrepancies between higher education institutions and prisons and collaborates with relevant stakeholders to bridge these gaps equitably and pragmatically.
The GFS does not
view education as merely a rehabilitative strategy or one to be used for purposes of reintegration, but rather as a tool for individual empowerment, personal betterment and overall improvement of communities worldwide.
The GFS centers
the voices of those who have lived experience studying while incarcerated and prioritizes these voices in all of its actions.
The GFS advocates
for more fair and effective hiring practices involving people with convictions and works to build employment opportunities for students in the network.
The GFS recognises
the power of global collaboration, storytelling and shared practices to advance strong program building and access to higher education for all..`}
            </div>
        </main>
    );
}
