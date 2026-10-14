import { useState } from "react";
import BottomNavbar, {
    PatientTab,
} from "../components/patient/BottomNavbar";
import PatientDashboard from "../components/patient/PatientDashboard";

export default function PatientRoute() {
    const [activeTab, setActiveTab] = useState<PatientTab>("home");

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return <PatientDashboard />;

            case "appointments":
                return (
                    <PatientDashboard />
                );

            case "records":
                return (
                    <PatientDashboard />
                );

            case "profile":
                return (
                    <PatientDashboard />
                );

            default:
                return <PatientDashboard />;
        }
    };

    return (
        <>
            {renderContent()}

            <BottomNavbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </>
    );
}