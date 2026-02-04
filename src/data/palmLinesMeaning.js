/**
 * 🖐️ PALM LINES MEANING DATA
 * Comprehensive database of palm line interpretations based on length, depth, and curvature.
 * Used to map AI analysis results to human-readable insights.
 */

export const palmLinesData = {
  // ═══════════════════════════════════════════════════════════
  // ❤️ HEART LINE (Emotion, Love, Relationships)
  // ═══════════════════════════════════════════════════════════
  heartLine: {
    title: "Heart Line",
    description: "Represents your emotional life, romantic perspectives, and cardiac health.",
    interpretations: {
      long_curved: {
        label: "Long & Curved",
        meaning: "You express feelings freely and have a warm, affectionate nature. You tend to be romantic and idealistic in love.",
        advice: "Your open heart is your strength, but ensure you don't give too much to those who don't appreciate it."
      },
      short_straight: {
        label: "Short & Straight",
        meaning: "You are more logical than emotional. You value freedom and may not like to display your feelings openly.",
        advice: "Try to express your emotions more often to build deeper connections with loved ones."
      },
      ends_index_finger: {
        label: "Ends under Index Finger",
        meaning: "You are content with your love life. You are selective about your partners and have high standards.",
        advice: "High standards are good, but remember that no one is perfect. Allow room for growth in relationships."
      },
      ends_middle_finger: {
        label: "Ends under Middle Finger",
        meaning: "You may have a tendency to be self-centered in relationships. You prioritize your own happiness.",
        advice: "Practice empathy and consider your partner's needs as equal to your own."
      },
      wavy: {
        label: "Wavy",
        meaning: "You may have many relationships but few serious ones. You enjoy the thrill of the chase.",
        advice: "If you seek stability, focus on building a strong foundation with one person rather than seeking novelty."
      },
      broken: {
        label: "Broken or Chained",
        meaning: "You may have experienced emotional trauma or inconsistent relationships in the past.",
        advice: "Healing is a journey. Don't let past hurts dictate your future happiness. Trust is built slowly."
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // 🧠 HEAD LINE (Intellect, Thinking Style)
  // ═══════════════════════════════════════════════════════════
  headLine: {
    title: "Head Line",
    description: "Represents your intellect, communication style, and thirst for knowledge.",
    interpretations: {
      long_straight: {
        label: "Long & Straight",
        meaning: "You have a clear, focused mind. You are logical, analytical, and decisive.",
        advice: "Your logic is powerful, but don't ignore your intuition. Sometimes the heart knows what the head misses."
      },
      short: {
        label: "Short",
        meaning: "You are practical and prefer physical achievements over mental speculation.",
        advice: "You are a doer. Use your practical skills to build tangible results, but don't shy away from planning."
      },
      curved_down: {
        label: "Curved Downwards",
        meaning: "You are highly creative and imaginative. You may be an artist, writer, or dreamer.",
        advice: "Channel your creativity into productive outlets. Ground your dreams with actionable steps."
      },
      separated_from_life: {
        label: "Separated from Life Line",
        meaning: "You have a sense of adventure and enthusiasm for life. You are independent.",
        advice: "Your independence is admirable. Ensure you stay connected to your roots and loved ones."
      },
      wavy: {
        label: "Wavy",
        meaning: "You have a short attention span but are very adaptable. You can multitask well.",
        advice: "Focus is a muscle. Practice mindfulness to harness your adaptability without losing direction."
      },
      deep: {
        label: "Deep & Clear",
        meaning: "You have excellent memory and concentration. You are a deep thinker.",
        advice: "Use your mental clarity to solve complex problems, but avoid overthinking simple situations."
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // 🌱 LIFE LINE (Vitality, Life Path, Health)
  // ═══════════════════════════════════════════════════════════
  lifeLine: {
    title: "Life Line",
    description: "Reflects your physical vitality, major life changes, and general well-being.",
    interpretations: {
      long_deep: {
        label: "Long & Deep",
        meaning: "You have good health, vitality, and stamina. You are well-grounded.",
        advice: "Maintain your vitality through a balanced lifestyle. You have the energy to achieve great things."
      },
      short_shallow: {
        label: "Short or Shallow",
        meaning: "You may have lower energy levels or be easily manipulated by others.",
        advice: "Prioritize self-care and set boundaries. Your energy is precious, protect it."
      },
      curved_wide: {
        label: "Curved Wide",
        meaning: "You have plenty of energy and enthusiasm. You love to travel and explore.",
        advice: "The world is your oyster. Use your energy to experience new cultures and ideas."
      },
      close_to_thumb: {
        label: "Close to Thumb",
        meaning: "You may easily get tired. You prefer the comfort of home over adventure.",
        advice: "It's okay to rest. Find strength in stability and build a comfortable, nurturing environment."
      },
      broken: {
        label: "Broken",
        meaning: "Indicates a sudden change in lifestyle, accident, or illness.",
        advice: "Change can be a catalyst for growth. Embrace transitions as opportunities to reinvent yourself."
      },
      multiple: {
        label: "Multiple Lines",
        meaning: "You have extra vitality and a strong guardian angel watching over you.",
        advice: "You have resilience in spades. Use this extra energy to help those who are less fortunate."
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // ✨ FATE LINE (Destiny, Career, Path)
  // ═══════════════════════════════════════════════════════════
  fateLine: {
    title: "Fate Line",
    description: "Also known as the Line of Destiny, it indicates the degree to which your life is affected by external circumstances.",
    interpretations: {
      deep_straight: {
        label: "Deep & Straight",
        meaning: "You are strongly controlled by fate. Your career path is likely clear and steady.",
        advice: "While fate plays a role, remember you hold the steering wheel. Make conscious choices."
      },
      broken: {
        label: "Broken or Shifted",
        meaning: "Your life will see many changes from external forces. You are adaptable.",
        advice: "Adaptability is survival. Flow with the changes rather than resisting them."
      },
      starts_joined_life: {
        label: "Joined with Life Line",
        meaning: "You are a self-made individual. You create your own aspirations early on.",
        advice: "Your determination is your greatest asset. Keep building your unique path."
      },
      starts_base_palm: {
        label: "Starts at Base",
        meaning: "You will find yourself in the public eye. You may achieve fame or recognition.",
        advice: "Handle recognition with humility. Use your platform for positive influence."
      },
      absent: {
        label: "Absent",
        meaning: "You may not have a stable career path, or you prefer a carefree life without strict plans.",
        advice: "Not everyone needs a mapped-out path. Enjoy the journey of discovery."
      }
    }
  }
};

/**
 * Helper function to get interpretation based on AI analysis tags.
 * @param {string} lineType - 'heartLine', 'headLine', etc.
 * @param {string} featureTag - 'long_curved', 'short', etc.
 * @returns {Object} Interpretation object
 */
export const getInterpretation = (lineType, featureTag) => {
  const line = palmLinesData[lineType];
  if (!line) return null;
  
  const interpretation = line.interpretations[featureTag];
  return interpretation ? { ...interpretation, title: line.title } : null;
};
