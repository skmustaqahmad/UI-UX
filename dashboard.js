import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Settings,
  AlertTriangle,
  BarChart2,
  Thermometer,
  Droplet,
  Wind,
} from "lucide-react";
import "./styles.css";

// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`card ${className}`} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`card-header ${className}`} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`card-title ${className}`} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`card-content ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

// Alert Component
const Alert = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={`alert alert-${variant} ${className}`}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5 ref={ref} className={`alert-title ${className}`} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`alert-description ${className}`} {...props} />
));
AlertDescription.displayName = "AlertDescription";

// Mock Data
const mockData = [
  { name: "Coop 1", temperature: 25, humidity: 60, ammonia: 10 },
  { name: "Coop 2", temperature: 24, humidity: 58, ammonia: 8 },
  { name: "Coop 3", temperature: 26, humidity: 62, ammonia: 12 },
  { name: "Coop 4", temperature: 23, humidity: 59, ammonia: 9 },
];

const deviceData = [
  { id: 1, name: "Device 1", status: "Online", battery: 80 },
  { id: 2, name: "Device 2", status: "Offline", battery: 20 },
  { id: 3, name: "Device 3", status: "Online", battery: 65 },
];

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderOverview = () => (
    <div className="grid">
      <Card className="card-blue">
        <CardHeader>
          <CardTitle>Farm Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="card-data">Good</div>
        </CardContent>
      </Card>
      <Card className="card-green">
        <CardHeader>
          <CardTitle>Environmental Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="environmental-data">
            <div className="data-row">
              <Thermometer className="icon" /> Temperature: 25°C
            </div>
            <div className="data-row">
              <Droplet className="icon" /> Humidity: 60%
            </div>
            <div className="data-row">
              <Wind className="icon" /> Ammonia: 10 ppm
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="card-yellow">
        <CardHeader>
          <CardTitle>Disease Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="card-data">Moderate</div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDevices = () => (
    <div>
      <h2 className="heading-purple">Connected Devices</h2>
      <div className="grid">
        {deviceData.map((device) => (
          <Card key={device.id} className="card-purple">
            <CardHeader>
              <CardTitle>{device.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {device.status}</p>
              <p>Battery: {device.battery}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDataVisualization = () => (
    <div>
      <h2 className="heading-teal">Data Visualization</h2>
      <Card className="card-teal">
        <CardHeader>
          <CardTitle>Environmental Conditions by Coop</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="temperature" fill="#ff9800" />
              <Bar dataKey="humidity" fill="#4caf50" />
              <Bar dataKey="ammonia" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderAlerts = () => (
    <div>
      <h2 className="heading-red">Alerts and Notifications</h2>
      <Alert variant="destructive">
        <AlertTriangle className="icon" />
        <AlertTitle>High Ammonia Levels</AlertTitle>
        <AlertDescription>
          Ammonia levels in Coop 3 have exceeded the recommended threshold.
          Please check ventilation.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle className="icon" />
        <AlertTitle>Device Offline</AlertTitle>
        <AlertDescription>
          Device 2 has gone offline. Please check the connection and battery
          status.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="container">
      <h1 className="heading-blue">Livestockify Dashboard</h1>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "devices" ? "active" : ""}`}
          onClick={() => setActiveTab("devices")}
        >
          Devices
        </button>
        <button
          className={`tab-button ${activeTab === "data" ? "active" : ""}`}
          onClick={() => setActiveTab("data")}
        >
          Data Visualization
        </button>
        <button
          className={`tab-button ${activeTab === "alerts" ? "active" : ""}`}
          onClick={() => setActiveTab("alerts")}
        >
          Alerts
        </button>
      </div>
      {activeTab === "overview" && renderOverview()}
      {activeTab === "devices" && renderDevices()}
      {activeTab === "data" && renderDataVisualization()}
      {activeTab === "alerts" && renderAlerts()}
    </div>
  );
};

export default Dashboard;
