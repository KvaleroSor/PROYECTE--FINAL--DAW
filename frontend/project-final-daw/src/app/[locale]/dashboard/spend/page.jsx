import GridSpendsMainPage from "./components/GridSpendsMainPage";

export default function Spendpage() {
    return (
        <div className="w-full min-h-screen bg-white dark:bg-slate-900 py-8 transition-colors duration-300">

            {/* Grid de metas — FULL WIDTH */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <GridSpendsMainPage />
            </div>

            {/* Gráfica — centrada y contenida */}
            <section className="w-full px-4 sm:px-6 lg:px-8 mt-8">
                {/* <ContributionHistoryChart /> */}
            </section>

        </div>
    );
}