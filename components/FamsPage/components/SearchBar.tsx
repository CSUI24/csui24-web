import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MajorSelectDropdown } from "./MajorSelectDropdown";
import { SearchCriteria } from "./types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { OptionalMajors } from "@/modules/fams-data";

export const SearchBar = ({
  onChange,
}: {
  onChange: (searchCriteria: SearchCriteria) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(() => {
    return {
      name: (searchParams?.get("qname") || "") as SearchCriteria["name"],
      major: (searchParams?.get("qmajor") || "") as SearchCriteria["major"],
    };
  });

  const textInputOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setSearchCriteria((p) => ({
        major: p.major,
        name: e.target.value,
      })),
    []
  );

  const majorSelectDropdownOnChange = useCallback((major: OptionalMajors) => {
    setSearchCriteria((p) => ({ ...p, major }));
  }, []);

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("qname", searchCriteria.name);
    params.set("qmajor", searchCriteria.major);
    return params.toString();
  }, [searchCriteria, searchParams]);

  useEffect(() => {
    if (!searchCriteria.name) {
      createQueryString();
      onChange(searchCriteria);
      router.push(`${pathname}?${createQueryString()}`);
      return;
    }
    const timeOutId = setTimeout(() => {
      onChange(searchCriteria);
      router.push(`${pathname}?${createQueryString()}`);
    }, 250);
    return () => clearTimeout(timeOutId);
  }, [searchCriteria, createQueryString, onChange, pathname, router]);

  return (
    <div
      className="max-md:pl-3 max-md:pr-2 md:pl-6 md:pr-3 py-3 
                    border border-[#D9D9D9] bg-white rounded-[40px] max-md:w-[290px] md:w-[420px] 
                    max-md:h-[35px] md:h-[50px] opacity-90 flex flex-row justify-stretch items-center max-xs:w-full
                    max-md:max-w-[290px]"
    >
      <input
        type="text"
        className="flex-1 max-md:min-w-24 md:min-w-28 w-max bg-transparent outline-none max-md:text-xs font-sfReg text-[#B3B3B3]"
        placeholder="Search by name"
        onChange={textInputOnChange}
        value={searchCriteria.name}
      />
      <MajorSelectDropdown onChange={majorSelectDropdownOnChange} />
    </div>
  );
};
