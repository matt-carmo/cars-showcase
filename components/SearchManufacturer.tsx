"use client";
import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";
import {
  Button,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Input,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");
  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className="search-manufacturer">
      <Combobox
        value={manufacturer}
        onChange={setManufacturer}
        onClose={() => setQuery("")}
      >
        <Button className="absolute top-[14px] ">
          <Image
            alt="Car Logo"
            src="/car-logo.svg"
            width={20}
            height={20}
            className="ml-4"
          />
        </Button>

        <ComboboxInput
          className={"search-manufacturer__input"}
          placeholder="Volkswagen"
          displayValue={(manufacturer: string) => manufacturer}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveTo="opacity-0"
          leaveFrom="opacity-100"
          afterLeave={() => setQuery("")}
          show={query.length > 0}
        >
          <ComboboxOptions
            anchor="bottom"
            className="search-manufacturer__options empty:invisible w-[var(--input-width)]"
          >
            {filteredManufacturers.map((item) => (
              <ComboboxOption
                key={item}
                value={item}
                className={`search-manufacturer__option relative data-[focus]:bg-blue-600 [data-active="true"]:bg-primary-blue-400
                        }`}
              >
                {item}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
};
export default SearchManufacturer;
