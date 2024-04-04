import { PieChart } from "@mui/x-charts/PieChart";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { customLoader } from "../utils/customLoader";
import Table from "../components/Table";

function Breakdown() {
  const { breakdown } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <section className="account-subsection-container">
      <Table
        tableCaption="Breakdown Transactions"
        tableHeader={["", "Category", "Total"]}
      >
        {breakdown
          .sort((b1, b2) => b2.count - b1.count)
          .map((b) => {
            return (
              <tr>
                <td>{b._id}</td>
                <td>
                  <strong>{b.count} ₪</strong>
                </td>
              </tr>
            );
          })}
      </Table>
      <div
        className="note"
        style={{ margin: "1rem", color: "var(--error-text-color)" }}
      >
        <strong>NOTE: </strong> each category includes in and out sums
      </div>
      <PieChart
        series={[
          {
            data: breakdown.map((b, i) => {
              return { id: i, value: b.count, label: b._id };
            }),
            innerRadius: 20,
            outerRadius: 100,
            paddingAngle: 0,
            cornerRadius: 3,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 150,
          },
        ]}
        width={600}
        height={275}
      />
    </section>
  );
}

export default Breakdown;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const loaderData = await customLoader({
    params,
    request,
    url: `transactions/${params.number}/breakdown`,
    specialErrors: [400, 401],
  });

  const { breakdown } = loaderData as {
    breakdown: { _id: string; count: number }[];
  };

  return { breakdown };
}
