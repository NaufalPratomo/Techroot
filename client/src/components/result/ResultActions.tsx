import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultActionsProps {
    pathId?: string | null;
    moduleId?: string | null;
}

export const ResultActions = ({ pathId, moduleId }: ResultActionsProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Button
                asChild
                className="flex-1 bg-[#2443B0] hover:bg-[#1e3895] text-white rounded-full h-12 text-base font-semibold"
            >
                <Link href="/dashboard">
                    <Home className="h-5 w-5 mr-2" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            {pathId && moduleId && (
                <Button
                    asChild
                    variant="outline"
                    className="flex-1 rounded-full h-12 text-base font-semibold border-slate-200 hover:bg-slate-50"
                >
                    <Link href={`/paths/${pathId}`}>
                        Lanjut Belajar
                        <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                </Button>
            )}
        </div>
    );
};
