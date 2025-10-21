import { Button } from "@/components/ui/button"
import DarkModeToggle from "../components/ui/DarkModeToggle.tsx"
import { Outlet, useNavigate } from "react-router-dom"
import { GiAirplaneDeparture } from "react-icons/gi"
import { AirplayIcon } from "lucide-react"

export default function MainLayout() {
    const nav = useNavigate()

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 flex flex-col justify-start text-left">
                        <h1 className="text-lg font-semibold">Trip Plan</h1>
                        <p className="text-gray-400 text-sm font-medium">여행 계획 어시스턴스</p>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm"
                                onClick={() => nav('/')}>홈</Button>
                            <Button variant="ghost" size="sm">지도</Button>
                        </nav>
                        <DarkModeToggle />
                    </div>
                </div>
            </header>
            <main className="container py-6">
                <Outlet />
            </main>
        </div>
    )
}