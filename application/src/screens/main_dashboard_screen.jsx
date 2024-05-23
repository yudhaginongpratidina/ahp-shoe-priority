import DashboardLayout from "../layouts/dashboard_layout"

import SelectComponent from "../components/select_component"

const percobaan_items = [
    { id: 1, name: "Brand 1"},
    { id: 2, name: "Brand 2"},
    { id: 3, name: "Brand 3"},
]

// console.table(percobaan_items)

export default function MainDashboardScreen() {
    return (
        <DashboardLayout>
            
            <div className="py-5">
                {/* PERCOBAAN SELECT */}
                <SelectComponent id ="brand" name = "brand" items = {percobaan_items}/>
            </div>

        </DashboardLayout>
    )
}