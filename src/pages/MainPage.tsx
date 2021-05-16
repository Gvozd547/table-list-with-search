import React, { useCallback, useEffect, useState } from "react";
import { Input, notification, Table } from "antd";
import { DrawerCard, SearchFilter } from "../components";
import { RootData, IllustrationData, Pack } from "../services";
import "antd/dist/antd.css";
import "./MainPage.css";
import { SEARCH_VALUE } from "../components/SearchFilter/SearchFilter";

const { Search } = Input;
const TABLE_COLUMNS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Pack Name",
    dataIndex: "pack",
    key: "packName",
    render: (pack: Pack) => pack.name,
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    key: "createdDate",
  },
];

export const MainPage = () => {
  const [initialState, setInitialState] = useState<IllustrationData[]>();
  const [state, setState] = useState<IllustrationData[]>();
  const [visibleCard, setVisibleCard] = useState(false);
  const [cardData, setCardData] = useState<IllustrationData | null>(null);
  const [searchFilterValue, setSearchFilterValue] =
    useState<keyof typeof SEARCH_VALUE | null>();

  useEffect(() => {
    RootData({ count: 100, page: 1 })
      .then((response) => {
        const illustrationData = response.data.result.illustrationData;
        setState(illustrationData);
        setInitialState(illustrationData);
      })
      .catch(() => {
        notification.error({
          message: "Ошибка сервера!",
        });
      });
  }, []);

  const handleSearch = useCallback(
    (searchText) => {
      const filteredEvents = initialState?.filter((column) => {
        let searchColumn;
        if (!searchFilterValue) {
          searchColumn = column.name;
        } else {
          if (searchFilterValue === SEARCH_VALUE[SEARCH_VALUE.pack]) {
            searchColumn = (
              column[searchFilterValue as keyof IllustrationData] as Pack
            ).name;
          } else {
            searchColumn = String(
              column[searchFilterValue as keyof IllustrationData]
            );
          }
        }
        const searchTextTrim = searchText.toLowerCase().trim();

        return searchColumn.toLowerCase().includes(searchTextTrim);
      });

      setState(filteredEvents);
    },
    [searchFilterValue, initialState]
  );

  return (
    <>
      <div className="main-page">
        <header className="main-page__header">
          <div className="main-page__header-filter">
            <SearchFilter setSearchFilterValue={setSearchFilterValue} />
          </div>
          <Search
            placeholder="Press Enter"
            onSearch={handleSearch}
            disabled={!state}
          />
        </header>
        <main>
          <Table
            rowKey="id"
            dataSource={state}
            loading={!state}
            onRow={(record) => ({
              onClick: () => {
                setCardData(record);
                setVisibleCard(true);
              },
            })}
            columns={TABLE_COLUMNS}
          />
        </main>
        <footer className="main-page__footer">
          Table List ©2021 Created by Gvozd547
        </footer>
      </div>
      <DrawerCard
        visible={visibleCard}
        setVisible={setVisibleCard}
        data={cardData}
      />
    </>
  );
};
