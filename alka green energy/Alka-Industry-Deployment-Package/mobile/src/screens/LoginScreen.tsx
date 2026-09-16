import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { UserRole } from '../types';

export const LoginScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('AGENT');
  const [email, setEmail] = useState('agent1@alkaindustry.com');
  const [password, setPassword] = useState('Agent@123');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginAsPreset, isLoading } = useAuthStore();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'ADMIN') {
      setEmail('admin@alkaindustry.com');
      setPassword('Admin@123');
    } else {
      setEmail('agent1@alkaindustry.com');
      setPassword('Agent@123');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter email address and password.');
      return;
    }
    await loginAsPreset(selectedRole);
  };

  return (
    <View style={styles.container}>
      {/* Top Logo Header */}
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.sunIcon}>☀️</Text>
        </View>
        <Text style={styles.brandTitle}>Alka Green Energy</Text>
        <Text style={styles.brandSubtitle}>Solar Rooftop Solutions</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.welcomeSub}>Sign in to your account</Text>

        {/* Segmented Pill Role Toggle */}
        <View style={styles.roleTogglePill}>
          <TouchableOpacity
            style={[styles.roleTab, selectedRole === 'AGENT' && styles.roleTabActiveAgent]}
            onPress={() => handleRoleSelect('AGENT')}
          >
            <Text style={[styles.roleTabText, selectedRole === 'AGENT' && styles.roleTabTextActive]}>
              Field Agent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleTab, selectedRole === 'ADMIN' && styles.roleTabActiveAdmin]}
            onPress={() => handleRoleSelect('ADMIN')}
          >
            <Text style={[styles.roleTabText, selectedRole === 'ADMIN' && styles.roleTabTextActive]}>
              System Admin
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginBtnText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotBtn} onPress={() => Alert.alert('Reset Password', 'Password reset instructions sent to email.')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* House & Solar Vector Graphic at Bottom */}
      <View style={styles.bottomIllustration}>
        <View style={styles.houseBox}>
          <Text style={styles.houseSolarIcon}>🏠⚡🌱</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Clean Light Background from image
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F59E0B22',
    borderWidth: 2,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sunIcon: {
    fontSize: 34,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  roleTogglePill: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  roleTabActiveAgent: {
    backgroundColor: '#F59E0B', // Amber gold from image
  },
  roleTabActiveAdmin: {
    backgroundColor: '#0F172A',
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  roleTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  eyeIcon: {
    fontSize: 16,
    padding: 4,
  },
  loginBtn: {
    backgroundColor: '#0F172A', // Dark Navy button from photo
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: 14,
  },
  forgotText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomIllustration: {
    alignItems: 'center',
    marginBottom: 10,
  },
  houseBox: {
    padding: 10,
  },
  houseSolarIcon: {
    fontSize: 32,
  },
});
