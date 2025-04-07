import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setCurrentDate, setPageTitle } from "../../dashboardSlice";
import {
  HeaderContainer,
  PageTitle,
  DateDisplay,
  FilterOptions,
  FilterButton,
} from "./DashboardHeader.styles";

interface DashboardHeaderProps {
  onFilterChange: (filter: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onFilterChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pageTitle = useSelector((state: RootState) => state.dashboard.pageTitle);
  const currentDate = useSelector((state: RootState) => state.dashboard.currentDate);
  const [activeFilter, setActiveFilter] = useState("Heute");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      const formattedDate = today.toLocaleDateString("de-DE", options);
      dispatch(setCurrentDate(formattedDate));
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <HeaderContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PageTitle>{pageTitle}</PageTitle>
        <DateDisplay>{currentDate}</DateDisplay>
      </div>
      <FilterOptions>
        <FilterButton
          className={activeFilter === "Heute" ? "active" : ""}
          onClick={() => handleFilterClick("Heute")}
        >
          Heute
        </FilterButton>
        <FilterButton
          className={activeFilter === "7d" ? "active" : ""}
          onClick={() => handleFilterClick("7d")}
        >
          7t
        </FilterButton>
      </FilterOptions>
    </HeaderContainer>
  );
};

export default DashboardHeader;