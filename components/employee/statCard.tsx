import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: number
    titleClassName?: string
}

export default function StatCard({ title, value, titleClassName}: StatCardProps) {
    return <div className="p-4 rounded-lg border border-gray-200 shadow-md bg w-full">  
        
            <h3 className={cn("text-base font-semibold mb-2", titleClassName)}>{title}</h3>
      
        <h2 className="text-lg font-bold">{value}</h2>
    </div>;
}