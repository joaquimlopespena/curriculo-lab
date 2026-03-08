import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ExecutiveResumeData } from "../types/resume";

interface ExecutivePdfProps {
  data: ExecutiveResumeData;
  accentColor?: string;
  sideBackground?: string;
  serifName?: boolean;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontSize: 10,
    fontFamily: "Helvetica",
    width: "210mm",
    height: "297mm",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: "#ffffff",
  },
  profileLabel: {
    fontSize: 9,
    letterSpacing: 2.8,
    textTransform: "uppercase",
    opacity: 0.85,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    marginTop: 10,
  },
  titleBlock: {
    width: "56%",
  },
  name: {
    fontSize: 25,
    fontWeight: 800,
    lineHeight: 0.98,
  },
  role: {
    marginTop: 4,
    fontSize: 11.2,
    fontWeight: 700,
    opacity: 0.95,
  },
  contactBlock: {
    width: "40%",
    alignItems: "flex-end",
    gap: 3,
    fontSize: 9.5,
  },
  body: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  main: {
    width: "65%",
    flexDirection: "column",
  },
  aside: {
    width: "35%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
  },
  section: {
    marginBottom: 12,
  },
  summarySection: {
    marginBottom: 16,
  },
  experienceSection: {
    flexDirection: "column",
  },
  experienceList: {
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 9.5,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 8,
  },
  paragraph: {
    color: "#475569",
    lineHeight: 1.5,
    fontSize: 10.5,
  },
  experienceItem: {
    borderLeftWidth: 3,
    paddingLeft: 10,
    marginBottom: 30,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 2,
  },
  experienceRole: {
    fontSize: 11.5,
    fontWeight: 800,
    color: "#0f172a",
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 700,
    marginTop: 1,
  },
  experiencePeriod: {
    fontSize: 9.5,
    color: "#64748b",
  },
  sideCard: {
    borderRadius: 8,
    padding: 12,
  },
  sideCardTitle: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 6,
  },
  listItem: {
    fontSize: 9.5,
    color: "#475569",
    lineHeight: 1.35,
    marginBottom: 3,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 2,
  },
  educationLine: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 8,
  },
});

export function ExecutivePdfDocument({
  data,
  accentColor = "#3f6ea5",
  sideBackground = "#f8fafc",
  serifName = false,
}: ExecutivePdfProps) {
  return (
    <Document title={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={{ ...styles.header, backgroundColor: accentColor }}>
          <Text style={styles.profileLabel}>Perfil profissional</Text>
          <View style={styles.headerRow}>
            <View style={styles.titleBlock}>
              <Text style={{ ...styles.name, fontFamily: serifName ? "Times-BoldItalic" : "Helvetica-Bold" }}>
                {data.personal.fullName}
              </Text>
              <Text style={styles.role}>{data.personal.title}</Text>
            </View>
            <View style={styles.contactBlock}>
              <Text>{data.personal.phone}</Text>
              <Text>{data.personal.email}</Text>
              <Text>{data.personal.linkedin}</Text>
              <Text>
                {data.personal.city}, {data.personal.state}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.main}>
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Resumo / Objetivo</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>

            <View style={styles.experienceSection}>
              <Text style={styles.sectionTitle}>Experiencia Profissional</Text>
              <View style={styles.experienceList}>
                {data.experience.map((item) => (
                  <View key={`${item.role}-${item.company}`} style={{ ...styles.experienceItem, borderLeftColor: accentColor }}>
                    <View style={styles.experienceHeader}>
                      <View style={{ width: "68%" }}>
                        <Text style={styles.experienceRole}>{item.role}</Text>
                        <Text style={{ ...styles.experienceCompany, color: accentColor }}>{item.company}</Text>
                      </View>
                      <Text style={styles.experiencePeriod}>{item.period}</Text>
                    </View>
                    <Text style={styles.paragraph}>{item.description}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.aside}>
            <View style={{ ...styles.sideCard, backgroundColor: sideBackground }}>
              <Text style={styles.sideCardTitle}>Resumo de qualificacoes</Text>
              {data.qualifications.map((item) => (
                <Text key={item} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>

            <View style={{ ...styles.sideCard, backgroundColor: sideBackground }}>
              <Text style={styles.sideCardTitle}>Formacao academica</Text>
              {data.education.map((item) => (
                <View key={`${item.degree}-${item.institution}`} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{item.degree}</Text>
                  <Text style={styles.educationLine}>{item.institution}</Text>
                  <Text style={styles.educationLine}>Conclusao: {item.conclusion}</Text>
                </View>
              ))}
            </View>

            <View style={{ ...styles.sideCard, backgroundColor: sideBackground }}>
              <Text style={styles.sideCardTitle}>Competencias</Text>
              {data.skills.map((item) => (
                <Text key={item} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
