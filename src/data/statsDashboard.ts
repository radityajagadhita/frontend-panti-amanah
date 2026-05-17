import api from "../lib/api";
import { useState, useEffect } from "react";

const statDashboard = () => {
    const [data, setData] = useState({
        anakAsuh: 0,
        tahunBerdiri: 12, // placeholder hardcode
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
                    tahunBerdiri: 12, // placeholder hardcode
                    donatur: donaturRes.data.data.length,
                    program: programRes.data.data.length,
                });
            } catch (error) {
                console.error("Gagal fetch data dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return { data, loading };
};

export default statDashboard;