import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { AtsResumeData } from "../types/resume";

interface AtsPdfProps {
  data: AtsResumeData;
  accentColor: string;
  softBackground: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  accentBar: {
    height: 6,
    width: 76,
    borderRadius: 999,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  name: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: 800,
  },
  role: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: 700,
    color: "#334155",
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 4,
    marginTop: 10,
  },
  contactItem: {
    width: "50%",
    fontSize: 8.1,
    color: "#475569",
    paddingRight: 8,
  },
  body: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  main: {
    width: "62%",
  },
  aside: {
    width: "38%",
  },
  section: {
    marginBottom: 12,
  },
  sideSection: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 8,
    letterSpacing: 2.6,
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 8.2,
    lineHeight: 1.4,
    color: "#475569",
  },
  experienceItem: {
    marginBottom: 9,
  },
  experienceRole: {
    fontSize: 9,
    fontWeight: 800,
    color: "#0f172a",
  },
  experienceMeta: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 1,
    marginBottom: 2,
  },
  educationDegree: {
    fontSize: 8.4,
    fontWeight: 800,
    color: "#0f172a",
  },
  educationLine: {
    fontSize: 7.9,
    lineHeight: 1.3,
    color: "#475569",
  },
  listItem: {
    fontSize: 8,
    lineHeight: 1.35,
    color: "#475569",
    marginBottom: 3,
  },
});

export function AtsPdfDocument({ data, accentColor, softBackground }: AtsPdfProps) {
  return (
    <Document title={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ ...styles.accentBar, backgroundColor: accentColor }} />
          <Text style={styles.name}>{data.personal.fullName}</Text>
          <Text style={styles.role}>{data.personal.title}</Text>
          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>
              {data.personal.city}, {data.personal.state}
            </Text>
            <Text style={styles.contactItem}>{data.personal.phone}</Text>
            <Text style={styles.contactItem}>{data.personal.email}</Text>
            <Text style={styles.contactItem}>{data.personal.linkedin}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.title}>Resumo / Objetivo</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Experiencia Profissional</Text>
              {data.experience.map((item) => (
                <View key={`${item.role}-${item.company}`} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.experienceRole}>{item.role}</Text>
                  <Text style={styles.experienceMeta}>
                    {item.company} | {item.period}
                  </Text>
                  <Text style={styles.paragraph}>{item.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.aside}>
            <View style={{ ...styles.sideSection, backgroundColor: softBackground }} wrap={false}>
              <Text style={styles.title}>Formacao Academica</Text>
              {data.education.map((item) => (
                <View key={`${item.degree}-${item.institution}`} style={{ marginBottom: 6 }}>
                  <Text style={styles.educationDegree}>{item.degree}</Text>
                  <Text style={styles.educationLine}>{item.institution}</Text>
                  <Text style={styles.educationLine}>Conclusao: {item.conclusion}</Text>
                </View>
              ))}
            </View>

            <View style={{ ...styles.sideSection, backgroundColor: softBackground }} wrap={false}>
              <Text style={styles.title}>Idiomas</Text>
              {data.languages.map((item) => (
                <Text key={`${item.name}-${item.level}`} style={styles.listItem}>
                  {item.name} - {item.level}
                </Text>
              ))}
            </View>

            <View style={{ ...styles.sideSection, backgroundColor: softBackground }} wrap={false}>
              <Text style={styles.title}>Competencias</Text>
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
