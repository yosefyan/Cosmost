import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { centerItem } from "../../../utils/utils";

const Graph = ({ squareData, whatToShow, serverData }) => {
  const [info, setInfo] = useState(
    whatToShow === "userAdmin"
      ? {
          users: 0,
          admins: 0,
        }
      : {
          coins: 0,
          gems: 0,
        }
  );

  useEffect(() => {
    setInfo(
      whatToShow === "userAdmin"
        ? {
            users:
              serverData && serverData?.filter((key) => !key.isAdmin).length,
            admins:
              serverData && serverData?.filter((key) => key.isAdmin).length,
          }
        : {
            coins:
              serverData &&
              serverData?.reduce((a, b) => {
                return a + b.moneyData.coins;
              }, 0),
            gems:
              serverData &&
              serverData?.reduce((a, b) => {
                return a + b.moneyData.gems;
              }, 0),
          }
    );
  }, [serverData]);

  const data = {
    labels: info.coins ? ["Coins", "Gems"] : ["Users", "Admins"],
    datasets: [
      {
        data: [info.users || info.coins, info.admins || info.gems],
        backgroundColor: ["", ""],
        borderColor: [
          squareData.firstColor.chart,
          squareData.secondColor.chart,
        ],
        borderWidth: 5,
      },
    ],
  };

  ChartJS.register(...registerables);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };
  return (
    <div style={{ zIndex: 99999 }} className={`w-full h-[70%] ${centerItem()}`}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Graph;
