import ApplicantsTable from "@/components/admin/ApplicantsTable";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          console.log(res.data.data);
          dispatch(setAllApplicants(res.data.data));
        }
      } catch (error) {}
    };
    fetchAllApplicants();
  }, []);
  return (
    <section className="max-w-7xl mx-auto ">
      <h1 className="font-bold text-xl my-5">
        Applicant{`(${applicants?.applications?.length})`}
      </h1>
      <ApplicantsTable />
    </section>
  );
};

export default Applicants;
