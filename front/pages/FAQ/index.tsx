// import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ContentFAQBox, MainFAQBox } from '../../styles/faq';
import { Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import MainLayout from '../../layouts/MainLayout';
import CustomAccordion from '../../components/Accordion/index';

const accordions = [
  { id: '1', title: 'sizing', text: { lorem: 'accordion-lorem' } },
  {
    id: '2',
    title: 'about-products',
    text: { lorem: 'accordion-lorem' },
  },
  { id: '3', title: 'notice', text: { lorem: 'accordion-lorem' } },
  { id: '4', title: 'retailer', text: { lorem: 'accordion-lorem' } },
  { id: '5', title: 'shipping', text: { lorem: 'accordion-lorem' } },
  {
    id: '6',
    title: 'returns-exchange',
    text: { lorem: 'accordion-lorem' },
  },
  {
    id: '7',
    title: 'common',
    text: {
      commonCan: 'common-can',
      canText1: 'can-text-1',
      canText2: 'can-text-2',
      returns: 'returns',
      returnsText: 'returns-text',
      exchanges: 'exchanges',
      customers: 'customers',
      customersText1: 'customers-text-1',
      international: 'International',
      important: 'important',
      custom: 'custom',
      pleaseText: 'please-text',
    },
  },
];

const FAQ = () => {
  const { t } = useTranslation('accordion');

  return (
    <MainLayout
      title="FAQ"
      keywords="FAQ, question, questions, answer"
      description="Main customer questions"
    >
      <MainFAQBox>
        <ContentFAQBox>
          <>
            <Typography variant="h1" color={Colors.secondaryWhite}>
              FAQ
            </Typography>
            {accordions.map((data) => (
              <CustomAccordion
                key={data.id}
                title={t(data.title)}
                textArr={data.text}
                accordionVariant="elevation"
              />
            ))}
          </>
        </ContentFAQBox>
      </MainFAQBox>
    </MainLayout>
  );
};

export default FAQ;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['accordion', 'common'])),
  },
});
