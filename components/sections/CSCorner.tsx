"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface StudentCount {
  id: number;
  label: string;
  value: number;
}

interface StudentCardProps {
  label: string;
  value: number;
  isVisible: boolean;
}

const StudentCounts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const studentCounts: StudentCount[] = [
    { id: 1, label: "Ilmu Komputer", value: 209 },
    { id: 2, label: "Sistem Informasi", value: 239 },
    { id: 3, label: "Ilmu Komputer KKI", value: 37 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto text-center">
        <h1 className="text-white text-4xl font-sfReg ">CS Corner</h1>
        <div className="py-28">
          <div className="flex justify-center pb-4">
            <StudentCard
              key={null}
              label="Fasilkom 2024"
              value={209+239+37}
              isVisible={isVisible}
            />
          </div>
          <div className="flex justify-center flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pt-12 pt-4 font-sfReg">
              {studentCounts.map((studentCount) => (
                <div
                  key={studentCount.id}
                  className={`${
                    studentCount.id === 1 || studentCount.id === 2
                      ? "md:border-r-2 border-gray-300"
                      : ""
                  }`}
                >
                  <StudentCard
                    label={studentCount.label}
                    value={studentCount.value}
                    isVisible={isVisible}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center pt-20">
            <Link
              href={"/fams"}
              className="bg-[#D9D9D9] px-12 py-4 rounded-xl text-black text-lg font-SfReg font-medium transition-all duration-500 hover:opacity-60"
            >
              See Detail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const StudentCard: React.FC<StudentCardProps> = ({
  label,
  value,
  isVisible,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = Math.ceil(end / (duration / 16));

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div className="pt-0 md:py-4 py-4">
      <h3 className="text-4xl font-sfPro text-white">{count}</h3>
      <p className="text-xl font-medium mt-2 text-white">{label}</p>
    </div>
  );
};

export default StudentCounts;
