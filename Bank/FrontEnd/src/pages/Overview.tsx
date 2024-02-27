import Wrapper from "../assets/stylingWrappers/Overview";

function Overview() {
  return (
    <section className="content">
      <Wrapper className="overview-details">
        <h3 className="title">accounts</h3>
        <p className="no-accounts-msg">You haven't open any account yet</p>
        {/* <table>
        <thead
          className="table-head"
          style={{ backgroundColor: "var(--yellow-light)" }}
        >
          <tr>
            <th></th>
            <th>number</th>
            <th>type</th>
            <th>balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>080345</td>
            <td>checking</td>
            <td>$2500</td>
          </tr>
          <tr>
            <td>092367</td>
            <td>savings</td>
            <td>$5000</td>
          </tr>
        </tbody>
      </table> */}
      </Wrapper>
    </section>
  );
}

export default Overview;
