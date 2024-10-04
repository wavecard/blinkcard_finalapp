import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Divider, Modal, Provider as PaperProvider } from "react-native-paper";
import useProtectedRoute from "../../app/AuthRoute/useProtectedRoutes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Loading from "../loder/loading";
const AccountPage: React.FC = () => {
  const {
    isCheckingToken,
    phoneNumber,
    deleteToken,
    firstname,
    lastname,
    email,
    emailVerificationStatus,
    kycVerificationStatus,
    mobileVerificationStatus,
  } = useProtectedRoute();

  const [isEnabled, setIsEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
  const mediumFontSize = Math.min(width, height) * 0.04;
  const largeFontSize = Math.min(width, height) * 0.07;
  const smallFontSize = Math.min(width, height) * 0.030;

  useEffect(() => {
    setIsEnabled(mobileVerificationStatus === "verified");
  }, [mobileVerificationStatus]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleLogout = async () => {
    await deleteToken();
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  if (isCheckingToken) {
    return (
      <View style={styles.loadingContainer}>
        <Loading/>
      </View>
    );
  }

  const Name = `${firstname} ${lastname}`;

  return (
    <PaperProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? 35 : 0,
        }}
      >
        <View style={{ backgroundColor: "white", flex: 1, padding: 15 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            Account
          </Text>
          <View>
            
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="person" size={20} color={Colors.primary} />
              <Text style={{ 
                color: "black", 
                fontSize: mediumFontSize,
                flexShrink: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                Name: {Name}
              </Text>
            </TouchableOpacity>
            <Divider style={{ backgroundColor: "gray" }} />
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="call" size={20} color={Colors.primary} />
              {phoneNumber && (
                <Text style={{ color: "black", fontSize: mediumFontSize }}>
                  Phone number: {phoneNumber}
                </Text>
              )}
            </TouchableOpacity>
            <Divider style={{ backgroundColor: "gray" }} />
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="at-circle" size={20} color={Colors.primary} />
              <Text
                style={{
                  color: "black",
                  fontSize: mediumFontSize,
                  flexShrink: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Email: {email}
              </Text>
            </TouchableOpacity>

            {emailVerificationStatus === "unverified" ? (
              <Text
                style={{
                  textAlign: "right",
                  padding: 10,
                  paddingTop: 0,
                  color: "red",
                }}
              >
                <Ionicons name="alert-circle-outline" /> Verify now
              </Text>
            ) : null}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons
                name="account-child-circle"
                size={20}
                color={Colors.primary}
              />
              <Text style={{ color: "black", fontSize: mediumFontSize }}>
                KYC status:{" "}
                {kycVerificationStatus === "verified"
                  ? "Verified"
                  : "unverified"}
              </Text>
              {kycVerificationStatus === "verified" ? (
                <Ionicons name="checkmark-circle" size={20} color="green" />
              ) : (
                <Ionicons name="close-circle" size={20} color="red" />
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.actions, { alignItems: "center" }]}>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="finger-print" size={20} color={Colors.primary} />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "black", fontSize: mediumFontSize }}>
                  Passcode:
                </Text>
                <Switch
                  trackColor={{ false: "#FFFFFF", true: "#8338EC" }}
                  thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ height: largeFontSize }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={showModal}>
              <Ionicons name="document" size={20} color={Colors.primary} />
              <Text style={{ color: "black", fontSize: mediumFontSize }}>
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons
                name="heart-broken"
                size={20}
                color={"red"}
              />
              <Text style={{ color: "black", fontSize: mediumFontSize }}>
                Close account
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              { backgroundColor: Colors.primary },
            ]}
            onPress={handleLogout}
          >
            <Text style={defaultStyles.buttonText}>
              <MaterialCommunityIcons name="location-exit" size={20} /> Log out
            </Text>
          </TouchableOpacity>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text style={{ color: Colors.gray,fontSize:smallFontSize }}>Version 1.0</Text>
            <Text style={{ color: Colors.gray, fontSize:smallFontSize }}>
              Blink Card a Wave Card Pvt Ltd company
            </Text>
          </View>
        </View>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Ionicons name="close-circle" onPress={hideModal} size={20} />
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <Text style={styles.modalSectionTitle}>Introduction</Text>
            <Text style={styles.modalText}>
              WAVE CARD PRIVATE LIMITED, BLINK CARD built the Blink Card app as
              a free app. This SERVICE is provided by WAVE CARD PRIVATE LIMITED,
              BLINK CARD at no cost and is intended for use as is.
            </Text>
            <Text style={styles.modalText}>
              We’re committed to protecting and respecting your privacy. We
              will:
            </Text>
            <Text style={styles.modalBullet}>
              - always keep your personal data safe and private
            </Text>
            <Text style={styles.modalBullet}>
              - never sell your personal data
            </Text>
            <Text style={styles.modalBullet}>
              - allow you to manage and review your marketing choices at any
              time
            </Text>
            <Text style={styles.modalText}>
              Why do I need to read this policy? We collect your personal data
              when you use:
            </Text>
            <Text style={styles.modalBullet}>
              - our website at www.blinkcard.in, app.blinkcard.in
            </Text>
            <Text style={styles.modalBullet}>- the Blink Card App</Text>
            <Text style={styles.modalBullet}>
              - any of the services available to you through the Blink Card app
              or website
            </Text>
            <Text style={styles.modalText}>
              If you have concerns about how we use your personal data, you can
              contact report@blinkcard.in
            </Text>
            <Text style={styles.modalSectionTitle}>1. Introduction</Text>
            <Text style={styles.modalText}>
              This Privacy Policy explains our policies regarding the
              collection, use, and disclosure of personal information when you
              use our Service and the choices you have associated with that
              information.
            </Text>
            <Text style={styles.modalSectionTitle}>
              2. Information Collection and Use
            </Text>
            <Text style={styles.modalText}>
              For a better experience, while using our Service, we may require
              you to provide us with certain personally identifiable
              information, including but not limited to:
            </Text>
            <Text style={styles.modalBullet}>- Name</Text>
            <Text style={styles.modalBullet}>- Mobile number</Text>
            <Text style={styles.modalBullet}>- Email address</Text>
            <Text style={styles.modalBullet}>
              - Information to complete KYC (Know Your Customer)
            </Text>
            <Text style={styles.modalBullet}>
              - OTP for verification before login
            </Text>
            <Text style={styles.modalBullet}>
              - any other information you provide us
            </Text>
            <Text style={styles.modalText}>
              You may provide us with personal data when you:
            </Text>
            <Text style={styles.modalBullet}>
              - speak with a member of our social media or customer support
              teams (either on the phone or through the Blink Card app)
            </Text>
            <Text style={styles.modalBullet}>
              - contact us for other reasons
            </Text>
            <Text style={styles.modalBullet}>- fill in any forms</Text>
            <Text style={styles.modalBullet}>
              - respond to any of our surveys
            </Text>
            <Text style={styles.modalBullet}>
              - sign up to Blink Card’s waitlist services or products
            </Text>
            <Text style={styles.modalText}>
              The information that we request will be retained by us and used as
              described in this privacy policy.
            </Text>
            <Text style={styles.modalSectionTitle}>
              3. Third-Party Services
            </Text>
            <Text style={styles.modalText}>
              The app uses third-party services for KYC purposes and to enhance
              user experience:
            </Text>
            <Text style={styles.modalBullet}>- Digilocker</Text>
            <Text style={styles.modalBullet}>- API Setu Gov India</Text>
            <Text style={styles.modalText}>
              These services may collect information used to identify you. Links
              to the privacy policies of third-party service providers used by
              the app are available on their respective websites.
            </Text>
            <Text style={styles.modalSectionTitle}>
              4. Disclosure of Information
            </Text>
            <Text style={styles.modalText}>
              We do not share your personal data with third parties except in
              the following circumstances:
            </Text>
            <Text style={styles.modalBullet}>- When we have your consent</Text>
            <Text style={styles.modalBullet}>
              - To comply with legal obligations
            </Text>
            <Text style={styles.modalBullet}>
              - To protect and defend our rights and property
            </Text>
            <Text style={styles.modalBullet}>
              - To prevent or investigate possible wrongdoing in connection with
              the service
            </Text>
            <Text style={styles.modalBullet}>
              - To protect the personal safety of users of the service or the
              public
            </Text>
            <Text style={styles.modalSectionTitle}>5. Security</Text>
            <Text style={styles.modalText}>
              We value your trust in providing us your personal information,
              thus we are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet, or method of electronic storage is 100% secure and
              reliable, and we cannot guarantee its absolute security.
            </Text>
            <Text style={styles.modalSectionTitle}>
              6. Changes to This Privacy Policy
            </Text>
            <Text style={styles.modalText}>
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </Text>
            <Text style={styles.modalText}>
              This policy is effective as of 2024-07-10.
            </Text>
            <Text style={styles.modalSectionTitle}>7. Contact Us</Text>
            <Text style={styles.modalText}>
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us at report@blinkcard.in.
            </Text>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    backgroundColor: "whitesmoke",
    borderRadius: 16,
    margin: 10,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalBullet: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
});
