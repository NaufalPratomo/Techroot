import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultActionsProps {
    pathId?: string | null;
    moduleId?: string | null;
}

export const ResultActions = ({ pathId, moduleId }: ResultActionsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
                asChild
                className="w-full bg-[#2443B0] hover:bg-[#1e3895] text-white rounded-full h-11 sm:h-12 text-sm sm:text-base font-semibold"
            >
                <Link href="/dashboard">
                    <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            {pathId && moduleId ? (
                <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full h-11 sm:h-12 text-sm sm:text-base font-semibold border-slate-200 hover:bg-slate-50"
                >
                    <Link href={`/paths/${pathId}`}>
                        Lanjut Belajar
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </Link>
                </Button>
            ) : (
                <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full h-11 sm:h-12 text-sm sm:text-base font-semibold border-slate-200 hover:bg-slate-50"
                >
                    <Link href="/paths">
                        Jelajahi Paths
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </Link>
                </Button>
            )}
        </div>
    );
};
