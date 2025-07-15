import { useEffect, useState } from "react";
import Prayer from "./components/Prayer";

//https://api.aladhan.com/v1/timingsByCity/14-07-2025?city=Mukalla&country=Yemen

const App = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [city, setCity] = useState("Mukalla");
  const [dateTimeH, setDateTimeH] = useState("");
  const [dateTimeE, setDateTimeE] = useState("");
  const cities = [
    { name: "المكلا", value: "Mukalla" },
    { name: "عدن", value: "Aden" },
    { name: "صنعاء", value: "Sana'a" },
    { name: "تعز", value: "Taiz" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/14-07-2025?city=${city}&country=Yemen`
        );
        const dataPrayer = await res.json();
        console.log(dataPrayer);
        setPrayerTimes(dataPrayer.data.timings);
        setDateTimeH(dataPrayer.data.date.hijri.date);
        setDateTimeE(dataPrayer.data.date.gregorian.date);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [city]);

  const timeFormat = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const ampm = hours >= 12 ? "م" : "ص";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <section className='bg-gradient-to-br from-emerald-700 to-emerald-900 text-white h-screen relative'>
        <div className='container m-auto absolute top-1/2 left-1/2 transform -translate-1/2 max-md:w-4/5 min-lg:w-1/3 bg-emerald-700 p-5 rounded-2xl'>
          <div className='top_sec flex justify-between py-7 bg-emerald-50 text-emerald-700 px-2 mb-5 rounded-2xl'>
            <div className='city w-1/2'>
              <h3 className='font-semibold mb-1'>المدينة:</h3>
              <select
                className='w-full bg-emerald-700 text-emerald-50 rounded focus:outline-0'
                name=''
                id=''
                onChange={(e) => {
                  setCity(e.target.value);
                }}>
                {cities.map((city) => {
                  return (
                    <option
                      key={city.value}
                      value={city.value}
                      className='bg-emerald-50 text-emerald-700 focus:outline-0'>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='date text-center'>
              <h3 className='font-semibold mb-1'>التاريخ:</h3>
              <h4 className=''>{dateTimeH}</h4>
              <h4 className=''>{dateTimeE}</h4>
            </div>
          </div>
          <div className='prayers py-7 bg-emerald-600 px-2 mb-5 rounded-2xl'>
            <Prayer name={"الفجر"} time={timeFormat(prayerTimes.Fajr)} />
            <Prayer name={"الظهر"} time={timeFormat(prayerTimes.Dhuhr)} />
            <Prayer name={"العصر"} time={timeFormat(prayerTimes.Asr)} />
            <Prayer name={"المغرب"} time={timeFormat(prayerTimes.Maghrib)} />
            <Prayer name={"العشاء"} time={timeFormat(prayerTimes.Isha)} />
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
