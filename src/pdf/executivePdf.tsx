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
  },
  header: {
    paddingHorizontal: 28,
    paddingVertical: 22,
    color: "#ffffff",
  },
  profileLabel: {
    fontSize: 9,
    letterSpacing: 3.2,
    textTransform: "uppercase",
    opacity: 0.85,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
    marginTop: 14,
  },
  titleBlock: {
    width: "58%",
  },
  name: {
    fontSize: 30,
    fontWeight: 800,
    lineHeight: 1.02,
  },
  role: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: 700,
    opacity: 0.95,
  },
  contactBlock: {
    width: "38%",
    alignItems: "flex-end",
    gap: 4,
    fontSize: 10,
  },
  body: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 20,
    gap: 16,
  },
  main: {
    width: "60%",
  },
  aside: {
    width: "40%",
    gap: 14,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 9,
    letterSpacing: 3.4,
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 8,
  },
  paragraph: {
    color: "#475569",
    lineHeight: 1.55,
    fontSize: 9.5,
  },
  experienceItem: {
    borderLeftWidth: 3,
    paddingLeft: 10,
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 3,
  },
  experienceRole: {
    fontSize: 10.5,
    fontWeight: 800,
    color: "#0f172a",
  },
  experienceCompany: {
    fontSize: 9.2,
    fontWeight: 700,
    marginTop: 2,
  },
  experiencePeriod: {
    fontSize: 9,
    color: "#64748b",
  },
  sideCard: {
    borderRadius: 16,
    padding: 12,
  },
  sideCardTitle: {
    fontSize: 9,
    letterSpacing: 3.4,
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 9.2,
    color: "#475569",
    lineHeight: 1.45,
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 9.6,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 1,
  },
  educationLine: {
    fontSize: 8.9,
    color: "#475569",
    marginBottom: 1,
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
              <Text style={{ ...styles.name, fontFamily: serifName ? "Times-Bold" : "Helvetica-Bold" }}>
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resumo / Objetivo</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencia Profissional</Text>
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
                <View key={`${item.degree}-${item.institution}`} style={{ marginBottom: 8 }}>
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
