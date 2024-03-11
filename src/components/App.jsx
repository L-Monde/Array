import React from "react";
import Api from "./Api";
import Main from "./Main";
import md5 from "blueimp-md5";
import { useRef, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

function App() {
  const [itemList, setItemList] = useState([]);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  today = yyyy + mm + dd;
  const api = new Api({
    url: "http://api.valantis.store:40000",
    headers: {
      "X-Auth": md5(`Valantis_${today}`),
      "Content-Type": "application/json",
    },
  });

  React.useEffect(() => {
    api
      .get_ids()
      .then((res) => {
        renderList(res);
      })
      .catch((err) => console.log("Ошибка:", err));
  }, []);
  /**/
  function renderList(data) {
    api.get_items(data.result).then((res) => {
      const relay = res.result.filter(
        (elem, index) =>
          res.result.findIndex((item) => item.id === elem.id) === index
      );
      setItemList(relay);
    });
  }
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex] == null
        ? console.log(record[dataIndex])
        : record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      console.log("123");
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "brand",
      dataIndex: "brand",
      key: "brand",
      width: "15%",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "40%",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
    },
    {
      title: "product",
      key: "product",
      dataIndex: "product",
      ...getColumnSearchProps("product"),
    },
  ];

  return (
    <div className="App">
      <Table
        columns={columns}
        dataSource={itemList}
        bordered
        pagination={{ pageSize: 50 }}
      />
    </div>
  );
}
/*

*/
export default App;
