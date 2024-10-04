import { ScrollView, Text, StyleSheet } from 'react-native';
import { Modal, Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const Privacymodal = ({ visible, hideModal }: { visible: boolean, hideModal: () => void }) => {
  return (
    <PaperProvider>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <Ionicons name='close-circle' onPress={hideModal} size={20} />
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <Text style={styles.modalSectionTitle}>Introduction</Text>
          <Text style={styles.modalText}>
            WAVE CARD PRIVATE LIMITED, BLINK CARD built the Blink Card app as a free app. This SERVICE is provided by WAVE CARD PRIVATE LIMITED, BLINK CARD at no cost and is intended for use as is.
          </Text>
          <Text style={styles.modalText}>
            We’re committed to protecting and respecting your privacy. We will:
          </Text>
          <Text style={styles.modalBullet}>- always keep your personal data safe and private</Text>
          <Text style={styles.modalBullet}>- never sell your personal data</Text>
          <Text style={styles.modalBullet}>- allow you to manage and review your marketing choices at any time</Text>
          <Text style={styles.modalText}>
            Why do I need to read this policy? We collect your personal data when you use:
          </Text>
          <Text style={styles.modalBullet}>- our website at www.blinkcard.in, app.blinkcard.in</Text>
          <Text style={styles.modalBullet}>- the Blink Card App</Text>
          <Text style={styles.modalBullet}>- any of the services available to you through the Blink Card app or website</Text>
          <Text style={styles.modalText}>
            If you have concerns about how we use your personal data, you can contact report@blinkcard.in
          </Text>
          <Text style={styles.modalSectionTitle}>1. Introduction</Text>
          <Text style={styles.modalText}>
            This Privacy Policy explains our policies regarding the collection, use, and disclosure of personal information when you use our Service and the choices you have associated with that information.
          </Text>
          <Text style={styles.modalSectionTitle}>2. Information Collection and Use</Text>
          <Text style={styles.modalText}>
            For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.
          </Text>
          <Text style={styles.modalSectionTitle}>3. Data Storage</Text>
          <Text style={styles.modalText}>
            We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
          </Text>
          <Text style={styles.modalSectionTitle}>4. Security</Text>
          <Text style={styles.modalText}>
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </Text>
          <Text style={styles.modalSectionTitle}>5. Changes to This Privacy Policy</Text>
          <Text style={styles.modalText}>
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
          </Text>
          <Text style={styles.modalText}>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at report@blinkcard.in.
          </Text>
        </ScrollView>
      </Modal>
    </PaperProvider>
  );
};

export default Privacymodal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flex: 1,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalText: {
    fontSize: 14,
    marginTop: 10,
  },
  modalBullet: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 20,
  },
});
