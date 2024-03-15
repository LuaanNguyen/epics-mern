import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
      {props.record.Time}
    </td>
    <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
      {props.record.Temperature}
    </td>
    <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
      {props.record["pH Concentration"]}
    </td>
    <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
      {props.record["O2 Concentration"]}
    </td>
    <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
      {props.record["Salinity"]}
    </td>
    <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center
        whitespace-nowrap text-md font-medium ring-offset-background
        transition-colors focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 disabled:pointer-events-none
        disabled:opacity-50 border border-input bg-background
        hover:bg-slate-100 h-9 rounded-md px-3"
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center
        whitespace-nowrap text-md font-medium ring-offset-background
        transition-colors focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 disabled:pointer-events-none
        disabled:opacity-50 border border-input bg-background
        hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        ></button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  //this method fetches the records from the database
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        setRecords(records);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getRecords();
  }, []);

  //This function will delete a second
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  //this method will map out the records on the table
  function recordList() {
    if (loading) {
      return (
        <tr>
          <td colSpan="6">Loading...</td>
        </tr>
      );
    } else if (records.length === 0) {
      return (
        <tr>
          <td colSpan="6">No records found</td>
        </tr>
      );
    } else {
      return records.map((record) => (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      ));
    }
  }

  //this following section will display the table with the records of individuals
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Water Quality Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Time
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Temperature
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  pH Concentration
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  O2 Concentration
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Salinity
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Define propTypes for Record component
Record.propTypes = {
  record: PropTypes.shape({
    Time: PropTypes.string.isRequired,
    Temperature: PropTypes.string.isRequired,
    "pH Concentration": PropTypes.string.isRequired,
    "O2 Concentration": PropTypes.string.isRequired,
    Salinity: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  deleteRecord: PropTypes.func.isRequired,
};
