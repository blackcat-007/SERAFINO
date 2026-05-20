"use client"

import { useEffect, useState } from "react"

export default function RoboticsDashboard() {

  // =========================================
  // SYSTEM STATE
  // =========================================

  const [systemOn, setSystemOn] = useState(false)

  // =========================================
  // LIVE STATS
  // =========================================

  const [obstacles, setObstacles] = useState(47)
  const [surfaceScans, setSurfaceScans] = useState(128)
  const [avgDistance, setAvgDistance] = useState(54)
  const [robotSpeed, setRobotSpeed] = useState(32)
  const [battery, setBattery] = useState(84)

  // =========================================
  // TABLE STREAMING
  // =========================================

  const [visibleCount, setVisibleCount] = useState(30)

  // =========================================
  // FAKE SENSOR DATA
  // =========================================

  const [terrainData] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,

      distance: Math.floor(Math.random() * 120) + 10,

      vibration: Math.floor(Math.random() * 6000) + 500,

      tiltX: (Math.random() * 1.4 - 0.7).toFixed(2),

      tiltY: (Math.random() * 1.4 - 0.7).toFixed(2),

      terrain:
        Math.random() > 0.65
          ? "Rough"
          : Math.random() > 0.35
          ? "Moderate"
          : "Smooth",

      obstacle:
        Math.random() > 0.7
          ? "Detected"
          : "Clear",

      speed: Math.floor(Math.random() * 40) + 20,
    }))
  )

  // =========================================
  // LIVE STATS ANIMATION
  // =========================================

  useEffect(() => {

    if (!systemOn) return

    const interval = setInterval(() => {

      setObstacles((prev) => prev + Math.floor(Math.random() * 2))

      setSurfaceScans((prev) => prev + 1)

      setAvgDistance(50 + Math.floor(Math.random() * 12))

      setRobotSpeed(30 + Math.floor(Math.random() * 4))

      setBattery((prev) => (prev > 20 ? prev - 1 : 84))

    }, 2500)

    return () => clearInterval(interval)

  }, [systemOn])

  // =========================================
  // LIVE TABLE STREAMING
  // =========================================

  useEffect(() => {

    if (!systemOn) return

    const streamInterval = setInterval(() => {

      setVisibleCount((prev) => {

        if (prev >= 100) return 100

        return prev + 1
      })

    }, 1200)

    return () => clearInterval(streamInterval)

  }, [systemOn])

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e3a8a22,transparent_40%),radial-gradient(circle_at_bottom_left,#06b6d422,transparent_40%)]" />

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <header className="relative z-10 border-b border-cyan-500/20 backdrop-blur-md bg-black/40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">

          {/* LEFT */}

          <div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-wide text-cyan-400 flex items-center gap-3">
              🤖 SERAFINO
            </h1>

            <p className="text-zinc-400 mt-1 text-sm sm:text-base">
              Intelligent Obstacle Detection & Surface Analysis System
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">

            {/* POWER TOGGLE */}

            <div className="px-4 py-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 w-full sm:w-auto">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-xs text-zinc-400">
                    POWER CONTROL
                  </p>

                  <p className="font-bold text-cyan-300 text-sm sm:text-base">
                    {systemOn ? "SYSTEM ON" : "SYSTEM OFF"}
                  </p>

                </div>

                <button
                  onClick={() => setSystemOn(!systemOn)}
                  className={`w-16 h-8 rounded-full relative transition-all duration-500 ${
                    systemOn
                      ? "bg-green-500"
                      : "bg-zinc-700"
                  }`}
                >

                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-500 ${
                      systemOn
                        ? "left-9"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>
            </div>

            {/* STATUS */}

            <div className="px-4 py-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 min-w-30">

              <p className="text-xs text-zinc-400">
                STATUS
              </p>

              <p
                className={`font-bold ${
                  systemOn
                    ? "text-green-400 animate-pulse"
                    : "text-red-400"
                }`}
              >
                {systemOn ? "ACTIVE" : "OFFLINE"}
              </p>

            </div>

            {/* MODE */}

            <div className="px-4 py-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 min-w-30">

              <p className="text-xs text-zinc-400">
                ROBOT MODE
              </p>

              <p className="font-bold text-cyan-300">
                {systemOn ? "AUTONOMOUS" : "STANDBY"}
              </p>

            </div>

            {/* BATTERY */}

            <div className="px-4 py-2 rounded-2xl border border-green-500/30 bg-green-500/10 w-full sm:w-55">

              <div className="flex items-center justify-between mb-1">

                <p className="text-xs text-zinc-400">
                  BATTERY
                </p>

                <p className="text-yellow-400 font-bold">
                  {battery}%
                </p>

              </div>

              <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-500/20">

                <div
                  className="h-full bg-linear-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${battery}%`,
                  }}
                />

              </div>

              <p className="text-[11px] text-zinc-500 mt-1">
                Estimated Runtime: 2h 14m
              </p>

            </div>

          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* MAIN */}
      {/* ========================================= */}

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* HERO */}

        <section className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* LEFT */}

          <div className="lg:col-span-2 bg-zinc-900/60 border border-cyan-500/20 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl">

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">

              <div>

                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">
                  Live Terrain Monitoring
                </h2>

                <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                  Real-time robotic navigation and intelligent obstacle prediction.
                </p>

              </div>

              {/* ONLINE INDICATOR */}

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-cyan-400/30 flex items-center justify-center relative self-center">

                {systemOn && (
                  <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping" />
                )}

                <div className="text-center">

                  <p className="text-xs text-zinc-400">
                    SYSTEM
                  </p>

                  <p
                    className={`font-black ${
                      systemOn
                        ? "text-cyan-300"
                        : "text-red-400"
                    }`}
                  >
                    {systemOn ? "ONLINE" : "OFFLINE"}
                  </p>

                </div>

              </div>
            </div>

            {/* LIVE STATS */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

              <StatCard
                title="Obstacles Detected"
                value={obstacles.toString()}
              />

              <StatCard
                title="Surface Scans"
                value={surfaceScans.toString()}
              />

              <StatCard
                title="Avg Distance"
                value={`${avgDistance} cm`}
              />

              <StatCard
                title="Robot Speed"
                value={`${robotSpeed} RPM`}
              />

            </div>
          </div>

          {/* SENSOR STATUS */}

          <div className="bg-zinc-900/60 border border-cyan-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl">

            <h3 className="text-2xl font-bold text-cyan-300 mb-6">
              Sensor Status
            </h3>

            <div className="space-y-5">

              <SensorStatus
                name="Ultrasonic Sensor"
                status={systemOn ? "Connected" : "Offline"}
              />

              <SensorStatus
                name="MPU6050"
                status={systemOn ? "Connected" : "Offline"}
              />

              <SensorStatus
                name="Servo Motor"
                status={systemOn ? "Active" : "Stopped"}
              />

              <SensorStatus
                name="Motor Driver"
                status={systemOn ? "Running" : "Idle"}
              />

              <SensorStatus
                name="Terrain Scanner"
                status={systemOn ? "Analyzing" : "Inactive"}
              />

            </div>
          </div>
        </section>

        {/* DATA TABLE */}

        <section className="bg-zinc-900/60 border border-cyan-500/20 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">

            <div>

              <h2 className="text-2xl font-bold text-cyan-300">
                Live Sensor Data Logs
              </h2>

              <p className="text-zinc-400 mt-1 text-sm sm:text-base">
                Real-time terrain analytics and obstacle monitoring.
              </p>

            </div>

            <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">

              {visibleCount} Records

            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-auto max-h-162.5 rounded-2xl border border-cyan-500/20">

            <table className="w-full text-sm min-w-212.5">

              <thead className="sticky top-0 bg-cyan-500/10 backdrop-blur-md">

                <tr className="text-left text-cyan-300">

                  <th className="p-4">ID</th>
                  <th className="p-4">Distance</th>
                  <th className="p-4">Vibration</th>
                  <th className="p-4">Tilt X</th>
                  <th className="p-4">Tilt Y</th>
                  <th className="p-4">Terrain</th>
                  <th className="p-4">Obstacle</th>
                  <th className="p-4">Motor Speed</th>

                </tr>
              </thead>

              <tbody>

                {terrainData.slice(0, visibleCount).map((data, index) => (

                  <tr
                    key={data.id}
                    className="border-t border-zinc-800 hover:bg-cyan-500/5 transition-all animate-fadeIn"
                    style={{
                      animationDelay: `${index * 0.03}s`,
                    }}
                  >

                    <td className="p-4 text-cyan-300 font-semibold">
                      #{data.id}
                    </td>

                    <td className="p-4">
                      {data.distance} cm
                    </td>

                    <td className="p-4">
                      {data.vibration}
                    </td>

                    <td className="p-4">
                      {data.tiltX}
                    </td>

                    <td className="p-4">
                      {data.tiltY}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          data.terrain === "Smooth"
                            ? "bg-green-500/20 text-green-300"
                            : data.terrain === "Moderate"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {data.terrain}
                      </span>

                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          data.obstacle === "Detected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-cyan-500/20 text-cyan-300"
                        }`}
                      >
                        {data.obstacle}
                      </span>

                    </td>

                    <td className="p-4">
                      {data.speed} RPM
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="mt-10 text-center text-zinc-500 text-sm px-4">

          Built using Next.js • Arduino UNO • MPU6050 • Ultrasonic Sensor • L298N

        </footer>
      </main>

      {/* ========================================= */}
      {/* ANIMATIONS */}
      {/* ========================================= */}

      <style jsx>{`

        @keyframes fadeIn {

          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }

      `}</style>
    </div>
  )
}

// =========================================
// STAT CARD
// =========================================

function StatCard({
  title,
  value,
}: {
  title: string
  value: string
}) {

  return (

    <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-4 hover:scale-105 transition-all duration-300">

      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h3 className="text-2xl sm:text-3xl font-black text-cyan-300 mt-2 wrap-break-word">
        {value}
      </h3>

    </div>
  )
}

// =========================================
// SENSOR STATUS
// =========================================

function SensorStatus({
  name,
  status,
}: {
  name: string
  status: string
}) {

  const active =
    status === "Connected" ||
    status === "Active" ||
    status === "Running" ||
    status === "Analyzing"

  return (

    <div className="flex items-center justify-between bg-black/30 border border-cyan-500/10 rounded-2xl px-4 py-3 gap-3">

      <div>

        <p className="font-semibold text-sm sm:text-base">
          {name}
        </p>

      </div>

      <div
        className={`flex items-center gap-2 font-bold text-sm ${
          active
            ? "text-green-400"
            : "text-red-400"
        }`}
      >

        <div
          className={`w-2 h-2 rounded-full ${
            active
              ? "bg-green-400 animate-pulse"
              : "bg-red-400"
          }`}
        />

        {status}

      </div>
    </div>
  )
}