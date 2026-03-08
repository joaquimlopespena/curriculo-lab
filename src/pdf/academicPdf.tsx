import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { AcademicResumeData } from "../types/resume";

interface AcademicPdfProps {
  data: AcademicResumeData;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#1c1917",
    fontFamily: "Times-Roman",
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d6d3d1",
    paddingBottom: 12,
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 25,
  },
  role: {
    marginTop: 3,
    fontSize: 12,
    color: "#57534e",
  },
  contactLine: {
    marginTop: 8,
    fontSize: 8.2,
    color: "#57534e",
  },
  section: {
    marginTop: 12,
  },
  title: {
    fontFamily: "Times-Bold",
    fontSize: 15,
    color: "#1c1917",
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: "#44403c",
  },
  item: {
    marginBottom: 7,
  },
  itemTitle: {
    fontFamily: "Times-Bold",
    fontSize: 9,
    color: "#1c1917",
  },
  itemMeta: {
    fontSize: 8,
    color: "#57534e",
    marginBottom: 2,
  },
  twoColumns: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  col: {
    width: "50%",
  },
  listItem: {
    fontSize: 8.2,
    lineHeight: 1.35,
    color: "#44403c",
    marginBottom: 4,
  },
});

export function AcademicPdfDocument({ data }: AcademicPdfProps) {
  return (
    <Document title={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.fullName}</Text>
          <Text style={styles.role}>{data.personal.title}</Text>
          <Text style={styles.contactLine}>
            {data.personal.city}, {data.personal.state} | {data.personal.phone}
          </Text>
          <Text style={styles.contactLine}>
            {data.personal.email} | {data.personal.linkedin}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Resumo / Objetivo</Text>
          <Text style={styles.paragraph}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Experiencia Profissional</Text>
          {data.experience.map((item) => (
            <View key={`${item.role}-${item.company}`} style={styles.item} wrap={false}>
              <Text style={styles.itemTitle}>{item.role}</Text>
              <Text style={styles.itemMeta}>
                {item.company} | {item.period}
              </Text>
              <Text style={styles.paragraph}>{item.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Formacao Academica</Text>
          {data.education.map((item) => (
            <View key={`${item.degree}-${item.institution}`} style={styles.item} wrap={false}>
              <Text style={styles.itemTitle}>{item.degree}</Text>
              <Text style={styles.itemMeta}>
                {item.institution} | {item.conclusion}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.col}>
            <Text style={styles.title}>Linhas de Pesquisa</Text>
            {data.researchLines.map((item) => (
              <Text key={item} style={styles.listItem}>
                {item}
              </Text>
            ))}
          </View>
          <View style={styles.col}>
            <Text style={styles.title}>Publicacoes</Text>
            {data.publications.map((item) => (
              <Text key={item} style={styles.listItem}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
