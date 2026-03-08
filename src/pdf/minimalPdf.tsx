import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { MinimalAwardsResumeData } from "../types/resume";

interface MinimalPdfProps {
  data: MinimalAwardsResumeData;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f4f4f5",
    color: "#18181b",
    fontFamily: "Helvetica",
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  layout: {
    flexDirection: "row",
    gap: 20,
  },
  aside: {
    width: "32%",
  },
  main: {
    width: "68%",
  },
  name: {
    fontSize: 26,
    fontWeight: 800,
    lineHeight: 1,
  },
  role: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: 700,
    color: "#f97316",
  },
  contact: {
    marginTop: 14,
    fontSize: 8.3,
    lineHeight: 1.45,
    color: "#3f3f46",
  },
  section: {
    borderTopWidth: 3,
    borderTopColor: "#18181b",
    paddingTop: 7,
    marginBottom: 12,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.45,
    color: "#3f3f46",
  },
  expTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "#18181b",
  },
  expMeta: {
    marginTop: 1,
    fontSize: 7.8,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: "#71717a",
  },
  expText: {
    marginTop: 4,
    fontSize: 8.5,
    lineHeight: 1.42,
    color: "#3f3f46",
  },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: 800,
    color: "#18181b",
    marginBottom: 6,
  },
  awardItem: {
    fontSize: 8.6,
    lineHeight: 1.4,
    color: "#3f3f46",
    marginBottom: 4,
  },
});

export function MinimalPdfDocument({ data }: MinimalPdfProps) {
  return (
    <Document title={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.layout}>
          <View style={styles.aside}>
            <Text style={styles.name}>{data.personal.fullName}</Text>
            <Text style={styles.role}>{data.personal.title}</Text>
            <Text style={styles.contact}>{data.address}</Text>
            <Text style={styles.contact}>
              {data.personal.city}, {data.personal.state}
            </Text>
            <Text style={{ ...styles.contact, color: "#f97316" }}>{data.personal.phone}</Text>
            <Text style={{ ...styles.contact, color: "#f97316" }}>{data.personal.email}</Text>
          </View>

          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>

            <View style={styles.section}>
              {data.experience.map((item) => (
                <View key={`${item.role}-${item.company}`} style={{ marginBottom: 10 }} wrap={false}>
                  <Text style={styles.expTitle}>
                    {item.company} / {item.role}
                  </Text>
                  <Text style={styles.expMeta}>{item.period}</Text>
                  <Text style={styles.expText}>{item.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Premios</Text>
              {data.awards.map((item) => (
                <Text key={`${item.title}-${item.year}`} style={styles.awardItem}>
                  {item.title} - {item.issuer} - {item.year}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
