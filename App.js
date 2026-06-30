import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// =====================
// GLOBAL DATA STORE
// =====================
const globalData = {
  customers: [
    {
      id: 'C001',
      name: 'Sara Khan',
      email: 'sara@gmail.com',
      filledCylinders: 3,
      emptyCylinders: 1,
      totalPaid: 5000,
      totalDue: 1500,
      orders: [
        { id: '#001', date: '27 Jun 2025', cylinder: '11.8 KG', amount: 2200, status: 'Delivered', paid: true },
        { id: '#002', date: '20 Jun 2025', cylinder: '6 KG', amount: 1200, status: 'Delivered', paid: false },
      ],
    },
    {
      id: 'C002',
      name: 'Usman Ali',
      email: 'usman@gmail.com',
      filledCylinders: 1,
      emptyCylinders: 2,
      totalPaid: 3000,
      totalDue: 0,
      orders: [
        { id: '#003', date: '25 Jun 2025', cylinder: '6 KG', amount: 1200, status: 'Delivered', paid: true },
      ],
    },
    {
      id: 'C003',
      name: 'Fatima Malik',
      email: 'fatima@gmail.com',
      filledCylinders: 2,
      emptyCylinders: 0,
      totalPaid: 8000,
      totalDue: 2500,
      orders: [
        { id: '#004', date: '22 Jun 2025', cylinder: '11.8 KG', amount: 2200, status: 'In Transit', paid: false },
      ],
    },
  ],
  stock: {
    totalKG: 450,
    remainingKG: 320,
    soldKG: 130,
  },
  cylinders: [
    { type: '2 KG', price: 500, stock: 10 },
    { type: '4 KG', price: 900, stock: 8 },
    { type: '6 KG', price: 1200, stock: 15 },
    { type: '8 KG', price: 1500, stock: 6 },
    { type: '11.8 KG', price: 2200, stock: 20 },
    { type: '45.4 KG', price: 7500, stock: 4 },
  ],
};

// =====================
// LOGIN SCREEN
// =====================
function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = (role, customerId = null) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'owner') navigation.navigate('OwnerDash');
      if (role === 'manager') navigation.navigate('ManagerDash');
      if (role === 'delivery') navigation.navigate('DeliveryDash');
      if (role === 'customer') navigation.navigate('CustomerDash', { customerId: 'C001' });
    }, 800);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B00" />
      <View style={styles.header}>
        <Text style={styles.logo}>🔥</Text>
        <Text style={styles.appName}>HT Gas</Text>
        <Text style={styles.tagline}>Gas Cylinder Management System</Text>
      </View>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Apna role select karo:</Text>
        <TouchableOpacity style={styles.roleBtn} onPress={() => handleLogin('owner')}>
          <Text style={styles.roleBtnText}>👑 Owner Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleBtn, { backgroundColor: '#2196F3' }]} onPress={() => handleLogin('manager')}>
          <Text style={styles.roleBtnText}>🧑‍💼 Manager Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleBtn, { backgroundColor: '#4CAF50' }]} onPress={() => handleLogin('delivery')}>
          <Text style={styles.roleBtnText}>🚚 Delivery Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleBtn, { backgroundColor: '#9C27B0' }]} onPress={() => handleLogin('customer')}>
          <Text style={styles.roleBtnText}>👤 Customer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// =====================
// CUSTOMER DASHBOARD
// =====================
function CustomerDashScreen({ navigation, route }) {
  const customerId = route?.params?.customerId || 'C001';
  const [customer, setCustomer] = useState(
    globalData.customers.find(c => c.id === customerId) || globalData.customers[0]
  );

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#9C27B0' }]}>
        <Text style={styles.dashTitle}>👤 HT Gas</Text>
        <Text style={styles.dashRole}>CUSTOMER DASHBOARD</Text>
        <Text style={styles.dashUser}>{customer.name}</Text>
      </View>
      <ScrollView style={styles.dashBody}>

        {/* Cylinder Status */}
        <Text style={styles.sectionTitle}>🧯 Mere Cylinders</Text>
        <View style={styles.statRow}>
          <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: '#4CAF50' }]}>
            <Text style={[styles.statNum, { color: '#4CAF50' }]}>{customer.filledCylinders}</Text>
            <Text style={styles.statLabel}>Bhare Cylinders</Text>
            <Text style={styles.statSub}>(Mere paas)</Text>
          </View>
          <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: '#FF9800' }]}>
            <Text style={[styles.statNum, { color: '#FF9800' }]}>{customer.emptyCylinders}</Text>
            <Text style={styles.statLabel}>Khali Cylinders</Text>
            <Text style={styles.statSub}>(Return karne hain)</Text>
          </View>
        </View>

        {/* Balance Status */}
        <Text style={styles.sectionTitle}>💰 Mera Balance</Text>
        <View style={styles.statRow}>
          <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: '#4CAF50' }]}>
            <Text style={[styles.statNum, { color: '#4CAF50', fontSize: 14 }]}>Rs {customer.totalPaid}</Text>
            <Text style={styles.statLabel}>Total Paid</Text>
          </View>
          <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: '#F44336' }]}>
            <Text style={[styles.statNum, { color: '#F44336', fontSize: 14 }]}>Rs {customer.totalDue}</Text>
            <Text style={styles.statLabel}>Total Due</Text>
          </View>
        </View>

        {/* Due Alert */}
        {customer.totalDue > 0 && (
          <View style={styles.alertCard}>
            <Text style={styles.alertText}>⚠️ Aapke zimme Rs {customer.totalDue} baqi hain — please jald ada karein!</Text>
          </View>
        )}

        {/* Order Stats */}
        <Text style={styles.sectionTitle}>📦 Orders Summary</Text>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#9C27B0' }]}>{customer.orders.length}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#4CAF50' }]}>
              {customer.orders.filter(o => o.status === 'Delivered').length}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#FF9800' }]}>
              {customer.orders.filter(o => o.status !== 'Delivered').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#9C27B0' }]}
          onPress={() => navigation.navigate('PlaceOrder', { customerId })}>
          <Text style={styles.actionBtnText}>+ Naya Order Place Karo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtnWhite}
          onPress={() => navigation.navigate('CustomerOrders', { customerId })}>
          <Text style={styles.actionBtnWhiteText}>📋 Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtnWhite}
          onPress={() => navigation.navigate('MyInvoices', { customerId })}>
          <Text style={styles.actionBtnWhiteText}>🧾 Invoices</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// CUSTOMER ORDERS SCREEN
// =====================
function CustomerOrdersScreen({ navigation, route }) {
  const customerId = route?.params?.customerId || 'C001';
  const customer = globalData.customers.find(c => c.id === customerId) || globalData.customers[0];

  const statusColor = (status) => {
    if (status === 'Pending') return '#FF9800';
    if (status === 'In Transit') return '#2196F3';
    if (status === 'Delivered') return '#4CAF50';
    return '#666';
  };

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#9C27B0' }]}>
        <Text style={styles.dashTitle}>📋 Order History</Text>
        <Text style={styles.dashRole}>{customer.name}</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        {customer.orders.map((order, i) => (
          <View key={i} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={[styles.orderStatus, { color: statusColor(order.status) }]}>
                {order.status}
              </Text>
            </View>
            <Text style={styles.orderCustomer}>{order.date}</Text>
            <View style={styles.orderBottom}>
              <Text style={styles.orderCylinder}>{order.cylinder}</Text>
              <Text style={styles.orderAmount}>Rs {order.amount}</Text>
            </View>
            <View style={[styles.payBadge, { backgroundColor: order.paid ? '#E8F5E9' : '#FFEBEE' }]}>
              <Text style={[styles.payBadgeText, { color: order.paid ? '#2E7D32' : '#C62828' }]}>
                {order.paid ? '✅ Paid' : '❌ Due'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// PLACE ORDER SCREEN
// =====================
function PlaceOrderScreen({ navigation, route }) {
  const customerId = route?.params?.customerId || 'C001';
  const [selected, setSelected] = useState(null);
  const [payMethod, setPayMethod] = useState('COD');

  const handleOrder = () => {
    if (!selected) {
      Alert.alert('Error', 'Cylinder type select karo!');
      return;
    }
    Alert.alert(
      'Order Confirm!',
      `${selected.type} — Rs ${selected.price}\nPayment: ${payMethod}\n\nOrder place ho gaya!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#9C27B0' }]}>
        <Text style={styles.dashTitle}>🛒 Order Place Karo</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <Text style={styles.sectionTitle}>Cylinder Type Select Karo:</Text>
        {globalData.cylinders.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cylinderCard, selected?.type === item.type && styles.cylinderCardSelected]}
            onPress={() => setSelected(item)}>
            <View style={styles.cylinderLeft}>
              <Text style={styles.cylinderType}>🧯 {item.type}</Text>
              <Text style={styles.cylinderPrice}>Rs {item.price}</Text>
            </View>
            {selected?.type === item.type && (
              <Text style={{ color: '#9C27B0', fontSize: 22, fontWeight: 'bold' }}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Payment Method:</Text>
        {['COD', 'JazzCash', 'EasyPaisa'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[styles.cylinderCard, payMethod === method && { borderColor: '#9C27B0', borderWidth: 2 }]}
            onPress={() => setPayMethod(method)}>
            <Text style={styles.cylinderType}>
              {method === 'COD' ? '💵' : method === 'JazzCash' ? '📱' : '💳'} {method}
            </Text>
            {payMethod === method && (
              <Text style={{ color: '#9C27B0', fontSize: 22, fontWeight: 'bold' }}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        {selected && (
          <View style={styles.calcCard}>
            <Text style={styles.calcLabel}>Total Amount</Text>
            <Text style={styles.calcValue}>Rs {selected.price}</Text>
            <Text style={styles.calcSub}>Payment: {payMethod}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#9C27B0', marginTop: 10 }]}
          onPress={handleOrder}>
          <Text style={styles.actionBtnText}>✅ Order Confirm Karo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// =====================
// MY INVOICES SCREEN
// =====================
function MyInvoicesScreen({ navigation, route }) {
  const customerId = route?.params?.customerId || 'C001';
  const customer = globalData.customers.find(c => c.id === customerId) || globalData.customers[0];

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#9C27B0' }]}>
        <Text style={styles.dashTitle}>🧾 Invoices</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        {customer.orders.map((order, i) => (
          <View key={i} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <Text style={styles.orderId}>INV-{order.id}</Text>
              <Text style={[styles.orderStatus, { color: order.paid ? '#4CAF50' : '#F44336' }]}>
                {order.paid ? 'Paid' : 'Due'}
              </Text>
            </View>
            <Text style={styles.orderCustomer}>{order.date}</Text>
            <View style={styles.orderBottom}>
              <Text style={styles.orderCylinder}>{order.cylinder}</Text>
              <Text style={styles.orderAmount}>Rs {order.amount}</Text>
            </View>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#9C27B0', marginTop: 10 }]}>
              <Text style={styles.actionBtnText}>📥 Download Invoice</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// OWNER DASHBOARD
// =====================
function OwnerDashScreen({ navigation }) {
  return (
    <View style={styles.dashContainer}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>🔥 HT Gas</Text>
        <Text style={styles.dashRole}>OWNER DASHBOARD</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{globalData.stock.totalKG}</Text>
            <Text style={styles.statLabel}>Total KG</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{globalData.stock.remainingKG}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#F44336' }]}>⚠️</Text>
            <Text style={styles.statLabel}>Low Alert</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Stock Management</Text>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('StockUpdate')}>
          <Text style={styles.actionBtnText}>📦 Stock Update Karo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtnWhite} onPress={() => navigation.navigate('CylinderTypes')}>
          <Text style={styles.actionBtnWhiteText}>🧯 Cylinder Types</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Customer Management</Text>
        <TouchableOpacity style={styles.actionBtnWhite} onPress={() => navigation.navigate('AllCustomers', { fromRole: 'owner' })}>
          <Text style={styles.actionBtnWhiteText}>👥 Customer Cylinders Update Karo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtnWhite} onPress={() => navigation.navigate('CustomerLedger')}>
          <Text style={styles.actionBtnWhiteText}>📒 Customer Ledger</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Users</Text>
        <TouchableOpacity style={styles.actionBtnWhite} onPress={() => navigation.navigate('ManageUsers')}>
          <Text style={styles.actionBtnWhiteText}>👤 Users Manage Karo</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Reports</Text>
        <TouchableOpacity style={styles.actionBtnWhite} onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.actionBtnWhiteText}>📊 Reports Dekho</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// ALL CUSTOMERS — CYLINDER UPDATE
// =====================
function AllCustomersScreen({ navigation, route }) {
  const fromRole = route?.params?.fromRole || 'owner';
  const headerColor = fromRole === 'owner' ? '#FF6B00' : '#2196F3';

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: headerColor }]}>
        <Text style={styles.dashTitle}>👥 Customer Cylinders</Text>
        <Text style={styles.dashRole}>Update karo kisi bhi customer ka</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        {globalData.customers.map((customer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.customerCard}
            onPress={() => navigation.navigate('UpdateCustomerCylinders', { customerId: customer.id, fromRole })}>
            <View style={styles.customerCardLeft}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>{customer.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.userName}>{customer.name}</Text>
                <Text style={styles.userEmail}>{customer.email}</Text>
              </View>
            </View>
            <View style={styles.customerCardRight}>
              <View style={styles.miniStat}>
                <Text style={[styles.miniStatNum, { color: '#4CAF50' }]}>{customer.filledCylinders}</Text>
                <Text style={styles.miniStatLabel}>Bhare</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={[styles.miniStatNum, { color: '#FF9800' }]}>{customer.emptyCylinders}</Text>
                <Text style={styles.miniStatLabel}>Khali</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={[styles.miniStatNum, { color: '#F44336', fontSize: 12 }]}>Rs {customer.totalDue}</Text>
                <Text style={styles.miniStatLabel}>Due</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// UPDATE CUSTOMER CYLINDERS
// =====================
function UpdateCustomerCylindersScreen({ navigation, route }) {
  const customerId = route?.params?.customerId || 'C001';
  const fromRole = route?.params?.fromRole || 'owner';
  const customerIndex = globalData.customers.findIndex(c => c.id === customerId);
  const customer = globalData.customers[customerIndex];
  const headerColor = fromRole === 'owner' ? '#FF6B00' : '#2196F3';

  const [filled, setFilled] = useState(String(customer.filledCylinders));
  const [empty, setEmpty] = useState(String(customer.emptyCylinders));
  const [paid, setPaid] = useState(String(customer.totalPaid));
  const [due, setDue] = useState(String(customer.totalDue));

  const handleSave = () => {
    globalData.customers[customerIndex].filledCylinders = parseInt(filled) || 0;
    globalData.customers[customerIndex].emptyCylinders = parseInt(empty) || 0;
    globalData.customers[customerIndex].totalPaid = parseInt(paid) || 0;
    globalData.customers[customerIndex].totalDue = parseInt(due) || 0;

    Alert.alert('✅ Saved!', `${customer.name} ki details update ho gayi!`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: headerColor }]}>
        <Text style={styles.dashTitle}>✏️ Update Karo</Text>
        <Text style={styles.dashRole}>{customer.name}</Text>
      </View>
      <ScrollView style={styles.dashBody}>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Customer</Text>
          <Text style={styles.infoValue2}>{customer.name}</Text>
          <Text style={styles.infoSub}>{customer.email}</Text>
        </View>

        <Text style={styles.sectionTitle}>🧯 Cylinder Update</Text>
        <Text style={styles.inputLabel}>Bhare Cylinders (Customer ke paas)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={filled}
          onChangeText={setFilled}
          placeholder="Bhare cylinders"
        />
        <Text style={styles.inputLabel}>Khali Cylinders (Return karne hain)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={empty}
          onChangeText={setEmpty}
          placeholder="Khali cylinders"
        />

        <Text style={styles.sectionTitle}>💰 Balance Update</Text>
        <Text style={styles.inputLabel}>Total Paid (Rs)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={paid}
          onChangeText={setPaid}
          placeholder="Total paid amount"
        />
        <Text style={styles.inputLabel}>Total Due (Rs)</Text>
        <TextInput
          style={[styles.input, { borderColor: '#F44336' }]}
          keyboardType="numeric"
          value={due}
          onChangeText={setDue}
          placeholder="Total due amount"
        />

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bhare Cylinders:</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>{filled || 0}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Khali Cylinders:</Text>
            <Text style={[styles.summaryValue, { color: '#FF9800' }]}>{empty || 0}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Paid:</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>Rs {paid || 0}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Due:</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>Rs {due || 0}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: headerColor }]} onPress={handleSave}>
          <Text style={styles.actionBtnText}>💾 Save Karo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// =====================
// STOCK UPDATE SCREEN
// =====================
function StockUpdateScreen({ navigation }) {
  const [received, setReceived] = useState('');

  const handleSave = () => {
    Alert.alert('Success', 'Stock update ho gaya!');
    navigation.goBack();
  };

  return (
    <View style={styles.dashContainer}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>📦 Stock Update</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{globalData.stock.totalKG}</Text>
            <Text style={styles.statLabel}>Total KG</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{globalData.stock.remainingKG}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{globalData.stock.soldKG}</Text>
            <Text style={styles.statLabel}>Sold KG</Text>
          </View>
        </View>
        <Text style={styles.inputLabel}>Gas Received (KG)</Text>
        <TextInput
          style={styles.input}
          placeholder="Received gas likhao"
          keyboardType="numeric"
          value={received}
          onChangeText={setReceived}
        />
        <TouchableOpacity style={styles.actionBtn} onPress={handleSave}>
          <Text style={styles.actionBtnText}>💾 Save Karo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// =====================
// CYLINDER TYPES
// =====================
function CylinderTypesScreen() {
  return (
    <View style={styles.dashContainer}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>🧯 Cylinder Types</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>+ Naya Type Add Karo</Text>
        </TouchableOpacity>
        {globalData.cylinders.map((item, index) => (
          <View key={index} style={styles.cylinderCard}>
            <View style={styles.cylinderLeft}>
              <Text style={styles.cylinderType}>{item.type}</Text>
              <Text style={styles.cylinderPrice}>Rs {item.price}</Text>
            </View>
            <View style={styles.cylinderRight}>
              <Text style={styles.cylinderStock}>{item.stock}</Text>
              <Text style={styles.cylinderStockLabel}>Stock</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// MANAGE USERS
// =====================
function ManageUsersScreen() {
  const users = [
    { name: 'Ali Hassan', role: 'Manager', email: 'ali@gmail.com' },
    { name: 'Bilal Ahmed', role: 'Delivery', email: 'bilal@gmail.com' },
    { name: 'Sara Khan', role: 'Customer', email: 'sara@gmail.com' },
  ];

  return (
    <View style={styles.dashContainer}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>👥 Users</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>+ Naya User Add Karo</Text>
        </TouchableOpacity>
        {users.map((user, index) => (
          <View key={index} style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{user.name[0]}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            <View style={[styles.roleBadge,
              user.role === 'Manager' && { backgroundColor: '#E3F2FD' },
              user.role === 'Delivery' && { backgroundColor: '#E8F5E9' },
              user.role === 'Customer' && { backgroundColor: '#F3E5F5' },
            ]}>
              <Text style={[styles.roleBadgeText,
                user.role === 'Manager' && { color: '#1565C0' },
                user.role === 'Delivery' && { color: '#2E7D32' },
                user.role === 'Customer' && { color: '#6A1B9A' },
              ]}>{user.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// REPORTS SCREEN
// =====================
function ReportsScreen() {
  const totalDue = globalData.customers.reduce((sum, c) => sum + c.totalDue, 0);
  const totalPaid = globalData.customers.reduce((sum, c) => sum + c.totalPaid, 0);

  return (
    <View style={styles.dashContainer}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>📊 Reports</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { fontSize: 13 }]}>Rs {totalPaid}</Text>
            <Text style={styles.statLabel}>Total Paid</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { fontSize: 13, color: '#F44336' }]}>Rs {totalDue}</Text>
            <Text style={styles.statLabel}>Total Due</Text>
          </View>
        </View>
        <View style={styles.reportCard}>
          <Text style={styles.reportTitle}>Total Customers</Text>
          <Text style={styles.reportValue}>{globalData.customers.length}</Text>
        </View>
        <View style={styles.reportCard}>
          <Text style={styles.reportTitle}>Gas Stock Remaining</Text>
          <Text style={styles.reportValue}>{globalData.stock.remainingKG} KG</Text>
        </View>
        <View style={styles.reportCard}>
          <Text style={styles.reportTitle}>Gas Sold</Text>
          <Text style={styles.reportValue}>{globalData.stock.soldKG} KG</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// =====================
// CUSTOMER LEDGER
// =====================
function CustomerLedgerScreen() {
  return (
    <View style={styles.dashContainer}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>📒 Customer Ledger</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        {globalData.customers.map((c, i) => (
          <View key={i} style={styles.ledgerCard}>
            <Text style={styles.ledgerName}>{c.name}</Text>
            <View style={styles.ledgerRow}>
              <View style={styles.ledgerItem}>
                <Text style={styles.ledgerLabel}>Bhare</Text>
                <Text style={[styles.ledgerPaid, { color: '#4CAF50' }]}>{c.filledCylinders}</Text>
              </View>
              <View style={styles.ledgerItem}>
                <Text style={styles.ledgerLabel}>Khali</Text>
                <Text style={[styles.ledgerPaid, { color: '#FF9800' }]}>{c.emptyCylinders}</Text>
              </View>
              <View style={styles.ledgerItem}>
                <Text style={styles.ledgerLabel}>Paid</Text>
                <Text style={styles.ledgerPaid}>Rs {c.totalPaid}</Text>
              </View>
              <View style={styles.ledgerItem}>
                <Text style={styles.ledgerLabel}>Due</Text>
                <Text style={[styles.ledgerDue, c.totalDue === 0 && { color: '#4CAF50' }]}>
                  Rs {c.totalDue}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// MANAGER DASHBOARD
// =====================
function ManagerDashScreen({ navigation }) {
  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#2196F3' }]}>
        <Text style={styles.dashTitle}>🧑‍💼 HT Gas</Text>
        <Text style={styles.dashRole}>MANAGER DASHBOARD</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#2196F3' }]}>12</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#2196F3' }]}>5</Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#2196F3' }]}>3</Text>
            <Text style={styles.statLabel}>Transit</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#2196F3' }]}
          onPress={() => navigation.navigate('OrdersList')}>
          <Text style={styles.actionBtnText}>📦 Orders Monitor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtnWhite}
          onPress={() => navigation.navigate('AllCustomers', { fromRole: 'manager' })}>
          <Text style={styles.actionBtnWhiteText}>🧯 Customer Cylinders Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtnWhite}
          onPress={() => navigation.navigate('CustomerLedger')}>
          <Text style={styles.actionBtnWhiteText}>📒 Customer Ledger</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// ORDERS LIST
// =====================
function OrdersListScreen() {
  const allOrders = globalData.customers.flatMap(c =>
    c.orders.map(o => ({ ...o, customerName: c.name }))
  );

  const statusColor = (status) => {
    if (status === 'Pending') return '#FF9800';
    if (status === 'In Transit') return '#2196F3';
    if (status === 'Delivered') return '#4CAF50';
    return '#666';
  };

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#2196F3' }]}>
        <Text style={styles.dashTitle}>📦 All Orders</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        {allOrders.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={[styles.orderStatus, { color: statusColor(order.status) }]}>
                {order.status}
              </Text>
            </View>
            <Text style={styles.orderCustomer}>{order.customerName}</Text>
            <View style={styles.orderBottom}>
              <Text style={styles.orderCylinder}>{order.cylinder}</Text>
              <Text style={styles.orderAmount}>Rs {order.amount}</Text>
            </View>
            <View style={[styles.payBadge, { backgroundColor: order.paid ? '#E8F5E9' : '#FFEBEE' }]}>
              <Text style={[styles.payBadgeText, { color: order.paid ? '#2E7D32' : '#C62828' }]}>
                {order.paid ? '✅ Paid' : '❌ Due'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// DELIVERY DASHBOARD
// =====================
function DeliveryDashScreen({ navigation }) {
  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#4CAF50' }]}>
        <Text style={styles.dashTitle}>🚚 HT Gas</Text>
        <Text style={styles.dashRole}>DELIVERY DASHBOARD</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#4CAF50' }]}>4</Text>
            <Text style={styles.statLabel}>Assigned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#4CAF50' }]}>2</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#4CAF50' }]}>1200</Text>
            <Text style={styles.statLabel}>COD Rs</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('MyDeliveries')}>
          <Text style={styles.actionBtnText}>📋 Meri Deliveries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtnWhite}>
          <Text style={styles.actionBtnWhiteText}>💰 Cash Update Karo</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// MY DELIVERIES
// =====================
function MyDeliveriesScreen() {
  const pendingOrders = globalData.customers.flatMap(c =>
    c.orders
      .filter(o => o.status !== 'Delivered')
      .map(o => ({ ...o, customerName: c.name }))
  );

  return (
    <View style={styles.dashContainer}>
      <View style={[styles.dashHeader, { backgroundColor: '#4CAF50' }]}>
        <Text style={styles.dashTitle}>📋 Meri Deliveries</Text>
      </View>
      <ScrollView style={styles.dashBody}>
        {pendingOrders.map((d, i) => (
          <View key={i} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <Text style={styles.orderId}>{d.id}</Text>
              <Text style={[styles.orderStatus, { color: '#FF9800' }]}>{d.status}</Text>
            </View>
            <Text style={styles.orderCustomer}>{d.customerName}</Text>
            <View style={styles.orderBottom}>
              <Text style={styles.orderCylinder}>{d.cylinder}</Text>
              <Text style={styles.orderAmount}>Rs {d.amount}</Text>
            </View>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#4CAF50', marginTop: 10 }]}>
              <Text style={styles.actionBtnText}>✅ Delivered Mark Karo</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =====================
// MAIN APP
// =====================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OwnerDash" component={OwnerDashScreen} />
        <Stack.Screen name="StockUpdate" component={StockUpdateScreen} />
        <Stack.Screen name="CylinderTypes" component={CylinderTypesScreen} />
        <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="CustomerLedger" component={CustomerLedgerScreen} />
        <Stack.Screen name="AllCustomers" component={AllCustomersScreen} />
        <Stack.Screen name="UpdateCustomerCylinders" component={UpdateCustomerCylindersScreen} />
        <Stack.Screen name="ManagerDash" component={ManagerDashScreen} />
        <Stack.Screen name="OrdersList" component={OrdersListScreen} />
        <Stack.Screen name="DeliveryDash" component={DeliveryDashScreen} />
        <Stack.Screen name="MyDeliveries" component={MyDeliveriesScreen} />
        <Stack.Screen name="CustomerDash" component={CustomerDashScreen} />
        <Stack.Screen name="CustomerOrders" component={CustomerOrdersScreen} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
        <Stack.Screen name="MyInvoices" component={MyInvoicesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// =====================
// STYLES
// =====================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF6B00' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#666' },
  header: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  logo: { fontSize: 64 },
  appName: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  tagline: { fontSize: 14, color: '#FFE0CC', marginTop: 6 },
  loginBox: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, paddingBottom: 40 },
  loginTitle: { fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center', fontWeight: '500' },
  roleBtn: { backgroundColor: '#FF6B00', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  roleBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  dashContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  dashHeader: { backgroundColor: '#FF6B00', padding: 20, paddingTop: 50 },
  dashTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  dashRole: { fontSize: 12, color: '#FFE0CC', marginTop: 2 },
  dashUser: { fontSize: 14, color: '#fff', marginTop: 4 },
  dashBody: { flex: 1, padding: 16 },
  statRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', elevation: 2 },
  statNum: { fontSize: 16, fontWeight: 'bold', color: '#FF6B00' },
  statLabel: { fontSize: 11, color: '#666', marginTop: 4, textAlign: 'center' },
  statSub: { fontSize: 10, color: '#999', marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10, marginTop: 6 },
  actionBtn: { backgroundColor: '#FF6B00', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  actionBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  actionBtnWhite: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  actionBtnWhiteText: { color: '#333', fontSize: 15, fontWeight: '500' },
  logoutBtn: { backgroundColor: '#fff', margin: 16, padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#FF6B00' },
  logoutText: { color: '#FF6B00', fontSize: 16, fontWeight: '600' },
  inputLabel: { fontSize: 14, color: '#333', marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 14 },
  infoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 14, alignItems: 'center', elevation: 2 },
  infoLabel: { fontSize: 13, color: '#666' },
  infoValue: { fontSize: 28, fontWeight: 'bold', color: '#FF6B00', marginTop: 4 },
  infoValue2: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 4 },
  infoSub: { fontSize: 13, color: '#666', marginTop: 2 },
  calcCard: { backgroundColor: '#F3E5F5', borderRadius: 12, padding: 16, marginBottom: 14, alignItems: 'center' },
  calcLabel: { fontSize: 13, color: '#6A1B9A' },
  calcValue: { fontSize: 24, fontWeight: 'bold', color: '#6A1B9A', marginTop: 4 },
  calcSub: { fontSize: 13, color: '#9C27B0', marginTop: 4 },
  cylinderCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1, borderWidth: 1, borderColor: '#eee' },
  cylinderCardSelected: { borderColor: '#9C27B0', borderWidth: 2 },
  cylinderLeft: { flex: 1 },
  cylinderType: { fontSize: 15, fontWeight: '600', color: '#333' },
  cylinderPrice: { fontSize: 13, color: '#FF6B00', marginTop: 2 },
  cylinderRight: { alignItems: 'center', marginRight: 12 },
  cylinderStock: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  cylinderStockLabel: { fontSize: 11, color: '#666' },
  editBtn: { backgroundColor: '#FFF3E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  editBtnText: { color: '#FF6B00', fontSize: 13, fontWeight: '500' },
  userCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  userAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF6B00', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  userAvatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userInfo: { flex: 1 },
  userName: { fontSize: 15, fontWeight: '600', color: '#333' },
  userEmail: { fontSize: 12, color: '#666', marginTop: 2 },
  roleBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  roleBadgeText: { fontSize: 12, fontWeight: '500', color: '#FF6B00' },
  orderCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, elevation: 1 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  orderId: { fontSize: 14, fontWeight: '700', color: '#333' },
  orderStatus: { fontSize: 13, fontWeight: '600' },
  orderCustomer: { fontSize: 15, color: '#333', marginBottom: 4 },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  orderCylinder: { fontSize: 13, color: '#666' },
  orderAmount: { fontSize: 14, fontWeight: '600', color: '#FF6B00' },
  payBadge: { marginTop: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start' },
  payBadgeText: { fontSize: 12, fontWeight: '600' },
  reportCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  reportTitle: { fontSize: 14, color: '#333' },
  reportValue: { fontSize: 15, fontWeight: '700', color: '#FF6B00' },
  ledgerCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, elevation: 1 },
  ledgerName: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 10 },
  ledgerRow: { flexDirection: 'row', gap: 8 },
  ledgerItem: { flex: 1, alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 8 },
  ledgerLabel: { fontSize: 11, color: '#666' },
  ledgerPaid: { fontSize: 14, fontWeight: '700', color: '#4CAF50', marginTop: 4 },
  ledgerDue: { fontSize: 14, fontWeight: '700', color: '#F44336', marginTop: 4 },
  alertCard: { backgroundColor: '#FFEBEE', borderRadius: 12, padding: 14, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: '#F44336' },
  alertText: { fontSize: 13, color: '#C62828', lineHeight: 20 },
  customerCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  customerCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  customerCardRight: { flexDirection: 'row', gap: 8 },
  miniStat: { alignItems: 'center' },
  miniStatNum: { fontSize: 16, fontWeight: 'bold', color: '#FF6B00' },
  miniStatLabel: { fontSize: 10, color: '#666' },
  summaryCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 14, elevation: 1 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, fontWeight: '700', color: '#333' },
  alertCard: { backgroundColor: '#FFEBEE', borderRadius: 12, padding: 14, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: '#F44336' },
  alertText: { fontSize: 13, color: '#C62828', lineHeight: 20 },
});
