import Image from "next/image";

import { CustomFilter, SearchBar, Hero, CarCard, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { CarProps } from "@/types";
import { fuels, manufacturers, yearsOfProduction } from "@/constants";
export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const allCars = await fetchCars({
    manufacturer: searchParams?.manufacturer?.toString() || ' ',
    year: searchParams?.year?.toString() || '',
    fuel: searchParams?.fuel?.toString() || '',
    limit: Number(searchParams?.limit) || 10,
    model: searchParams?.model?.toString() || '',
  });
  console.log(allCars)
  const isDataEmpty = allCars.length === 0 || !allCars || !allCars[0];

  console.log(isDataEmpty)

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore othes cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: CarProps) => (
                <CarCard key={car.model} car={car} />
              ))}
            </div>
            <ShowMore pageNumber={Number(searchParams?.pageNumber) || 10} isNext={(searchParams?.limit || 10) > allCars.length}  />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oop,s no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
