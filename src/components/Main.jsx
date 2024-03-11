function Main(props) {
  const { items } = props;
  return (
    <section className="elements">
      <div className="items">
        <table className="table">
          <tbody>
            <tr>
              <th>Brand</th>
              <th>Id</th>
              <th>Price</th>
              <th>Product</th>
            </tr>
            {}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default Main;
