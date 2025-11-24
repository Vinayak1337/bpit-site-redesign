import React from 'react';
import { getMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import DisclosureEditor from './components/DisclosureEditor';

export default async function AdminMandatoryDisclosurePage() {
    const data = await getMandatoryDisclosure();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mandatory Disclosure</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage mandatory disclosure documents and links.
                    </p>
                </div>
            </div>
            <DisclosureEditor initialData={data} />
        </div>
    );
}

