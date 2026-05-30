import api from "../lib/api";
import { useState, useEffect } from "react";

const statDashboard = () => {
    const [data, setData] = useState({
        anakAsuh: 0,
        tahunBerdiri: 26, // placeholder hardcode
        donatur: 0,
        program: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [anakAsuhRes, donaturRes, programRes] = await Promise.all([
                    api.get("/anak-asuh"),
                    api.get("/donations"),
                    api.get("/programs"),
                ]);

                setData({
                    anakAsuh: anakAsuhRes.data.data.length,
                    tahunBerdiri: new Date().getFullYear() - 2013,
                    donatur: donaturRes.data.data.length,
                    program: programRes.data.data.length,
                });
            } catch (error) {
                console.error("Gagal fetch data stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return { data, loading };
};

export default statDashboard;