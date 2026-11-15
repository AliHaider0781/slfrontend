function DashboardPage() {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full px-6 py-2 flex flex-col justify-center gap-6">
        <div className="w-full px-8 py-6 bg-(--white) flex flex-col justify-center items-start gap-4 border-[3px] border-(--teal) rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-(--text-black)">
            Shorten a Link
          </h1>
          <div className="flex gap-5 justify-start items-center">
            <input
              type="text"
              value=""
              onChange=""
              placeholder="Enter your long URl here..."
              className="text-(--text-black) border-2 border-(--border-gray) bg-(--white) w-175 px-5 py-2 text-lg rounded-lg placeholder:text-(--text-black)/70 focus:outline-none"
            />

            <button
              onClick=""
              className="bg-(--teal) text-(--white) px-5 py-3 rounded-lg font-semibold transition duration-300 hover:bg-(--teal)/60"
            >
              Shorten Link
            </button>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col justify-center items-start gap-2 w-80 border-2 border-(--border-gray) rounded-md p-6 shadow-lg">
            <h1>Total Clicks</h1>
            <p>1,524</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 w-80 border-2 border-(--border-gray) rounded-md p-6 shadow-lg">
            <h1>Active Links</h1>
            <p>45</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 w-80 border-2 border-(--border-gray) rounded-md p-6 shadow-lg">
            <h1>Top Performing Link</h1>
            <p>/promo-sale</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <table className="w-full border-separate border-spacing-0 border-2 rounded-md overflow-hidden border-(--border-gray) shadow-lg">
            <thead>
              <tr>
                <th
                  colSpan={4}
                  className="p-4 text-left border-b-2 border-(--border-gray) text-2xl"
                >
                  Recent Links
                </th>
              </tr>
              <tr className="bg-(--bg-nav)">
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  Original Link
                </th>
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  Short Link
                </th>
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  Clicks
                </th>
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  https://google.com
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  shortly.com/2gU4h6
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  300
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  Jan 21, 2021, 4:08 AM
                </td>
              </tr>
              <tr>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  https://google.com
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  shortly.com/2gU4h6
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  300
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  Jan 21, 2021, 4:08 AM
                </td>
              </tr>
              <tr>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  https://google.com
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  shortly.com/2gU4h6
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  300
                </td>
                <td className="p-3 text-left border-b-2 border-(--border-gray)">
                  Jan 21, 2021, 4:08 AM
                </td>
              </tr>
              <tr>
                <td className="p-3 text-left">https://google.com</td>
                <td className="p-3 text-left">shortly.com/2gU4h6</td>
                <td className="p-3 text-left">300</td>
                <td className="p-3 text-left">Jan 21, 2021, 4:08 AM</td>
              </tr>
            </tbody>
          </table>
          <p className="font-semibold text-sm text-center">
            <a href="/links">View more links...</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;